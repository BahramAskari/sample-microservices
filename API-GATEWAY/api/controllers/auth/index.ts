import { Request, Response, NextFunction } from 'express'
import {REQUEST} from "../../routes";
import {User} from "../../../db/models"
import {
    RegisterUserDTO,
    LoginUserDTO,
} from '../../Types/Dto/auth'
import Crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {ValidateLogin, ValidateRegister} from "../../Validators/auth";
import {
    checkValidAccessToken,
    checkValidRefreshToken,
    generateJwtRefreshTokenByEmail,
    generateJwtTokenByEmail
} from "../../../lib/token";
import sequelizeConnection from "../../../db/config";
import {FieldsValidation} from "../../errors/FieldsValidation";
import LoginSession from "../../../db/models/LoginSession";


/**
 * Register operations (using multiple services to gain the response.
 * @validateor fastest-validator
 */
export const register = async (req: Request, res: Response, next: NextFunction)  => {
    const payload:RegisterUserDTO = req.body
    try {

        // todo 0 -> check & validate user credentials (username, phone|password|...)
        const Validation = await ValidateRegister(payload)
        if (Validation !== true) throw new FieldsValidation(Validation)

        // todo 1 -> register user
        const user = await User.create(payload, {
            fields:  ["username", "firstName", "lastName", "sign", "email", "password"],
        })

        // user is verified by default -> create access-token & refrsh-token
        const accessToken = await generateJwtTokenByEmail(payload.email, user.id)
        const refreshToken = await generateJwtRefreshTokenByEmail(payload.email, user.id)
        // update user's refresh-token
        await user.update({refreshToken: refreshToken})

        // create user's login-session
        const UserSession = new LoginSession({
            accessToken,
            refreshToken,
        })
        await UserSession.save()
        await user.addLoginSession(UserSession.id)

        return res
            .status(200)
            .send({ code: 200, type: "SUCCESS", verified: true, accessToken, refreshToken });

    } catch (e) {    next(e)     }
}


/**
 * Login normally (username | email and password)
 */
export const loginAdmin = async (req: Request, res: Response, next: NextFunction)  => {
    const payload:LoginUserDTO = req.body
    const transaction = await sequelizeConnection.transaction()
    try {
        // todo 1 -> check & validate user credentials (username, phone|password|...)
        const authLoginValidate = await ValidateLogin(payload)
        if (authLoginValidate !== true) throw new FieldsValidation(authLoginValidate)
        // const user = await service.signInByEmail(payload);
        const user = await User.findOne({where: {email: payload.email}})

        // todo 2 -> user signedIn conceptually =>  generate JWT token and refreshToken
        const accessToken = await generateJwtTokenByEmail(payload.email, user.id)
        const refreshToken = await generateJwtRefreshTokenByEmail(payload.email, user.id)
        // todo 3 -> store refresh token for user
        // update user's refresh-token
        await user.update({refreshToken: refreshToken})

        // create user's login-session
        const UserSession = new LoginSession({
            accessToken,
            refreshToken,
        })
        await UserSession.save({transaction: transaction})
        await user.addLoginSession(UserSession.id, {transaction: transaction})

        await transaction.commit()

        return res
            .status(200)
            .send({ code: 200, type: "SUCCESS", verified: true, accessToken, refreshToken,  });


    } catch (e) {
        await transaction.rollback()
        next(e)
    }
}


/**
 * Refresh access token
 */
export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction)  => {
    //  const { refreshToken } = req.body;
    const { token: refreshToken } = req.params;
    try {
        // todo 1 -> verify & decode refresh token by refreshSecret
        // const isValidRefreshToken = isValidRefreshTokenByEmail(email, userId, refreshToken);
        //const isValidSession = await isValidLoginSession(email, userId, accessToken, refreshToken)
        console.log(`Authorization: `, 1)
        const {isValid: isRefreshValid, session: refreshSession, iat: refreshIat, exp: refreshExp} = await checkValidRefreshToken(refreshToken)
        console.log(`Authorization: `, 2)
        if (!refreshSession) return res.status(401).send({error: true, Authorized: false, UnAuthorized: true, })
        console.log(`Authorization: `, 3)
        const {isValid: isAccessValid, session: accessSession, iat: accessIat, exp: accessExp} = await checkValidAccessToken(refreshSession.accessToken)
        console.log(`Authorization: `, 4)

        // todo 2 -> -1- cache tokens to blacklist to prevent access till they've been expired -2- delete login session (accessToken & refreshToken record)
        await LoginSession.destroy({
            where: {id: refreshSession.id, }
        })
        console.log(`Authorization: `, 5)
        console.log(req.route.path, 4)
        // todo 3 -> update token as used & user as verified & generate JWT access & refresh token  (Mr Smart) -> isOptValid[1]
        const AccessToken = await generateJwtTokenByEmail(refreshSession.User.email, refreshSession.User.id)
        console.log(`Authorization: `, 6)
        const RefreshToken = await generateJwtRefreshTokenByEmail(refreshSession.User.email, refreshSession.User.id)
        console.log(`Authorization: `, 7)
        // todo 4 -> store refresh token for user
        // update user's refresh-token
        await User.update({refreshToken: RefreshToken}, {where: {id: refreshSession.User.id}})
        console.log(`Authorization: `, 8)

        // create user's login-session
        const UserSession = new LoginSession({
            accessToken: AccessToken,
            refreshToken: RefreshToken,
        })
        await UserSession.save()
        await UserSession.setUser(refreshSession.User.id)
        console.log(`Authorization: `, 9)

        return res
            .status(201)
            .send({ success: true, verified: true, accessToken: AccessToken, refreshToken: RefreshToken });

    } catch (e) {next(e)}
}
/**
 * Logout
 */
export const logout = async (req: REQUEST, res: Response, next: NextFunction)  => {
    // به جهت امنیت، تنها ه توکن دسترسی نیاز نیاز است. چون بسیار مهم است که اگر دست کسی بیفتد، برای کار های مخرب، کفایت می کند
    // کسی که به اینجا می رسد، یعنی از میان افزار CheckAuth گذر کرده و توکن دسترسی او قابل قبول بوده. اما اینجا نیاز به اوکن تازه سازی داریم تا بعداً نتواند آن را تازه سازی کند
    // البته در اینجا حتی نیازی هم نیست که توکن تازه سازی ارسال شد هباشد. چون توکن دسترسی هم با آن همسان است و کسی به این مسیر دسترسی دارد که توکن دسترسی فعال داشته باشد
    const { email, userId, accessToken, refreshToken } = req.body;
    try {
        // todo 1 -> verify & decode refresh token by refreshSecret
        //const {isValid, session, iat, exp} = await service.checkValidRefreshToken(req.refreshToken);
        const {isValid: isAccessValid, session: accessSession, iat: accessIat, exp: accessExp} = await checkValidAccessToken(req.accessToken)
        if (!isAccessValid) throw new Error() //// ToDo Partial ->  throw new PartialErrors(["TOKEN_FAILED"])
        const {isValid: isRefreshValid, session: refreshSession, iat: refreshIat, exp: refreshExp} = await checkValidRefreshToken(accessSession.refreshToken)



        // اگر توکن تازه سازی اصلاً منقضی شده، باید همین دسترسی هم قطع گردد؟
        // todo 2 -> delete login session for user
        await LoginSession.destroy({
            where: {id: accessSession.id}
        })

        return res
            .status(200).send(true)
        // .send({ success: true, verified: true, accessToken: AccessToken, refreshToken: RefreshToken });

    } catch (e) {next(e)}
}