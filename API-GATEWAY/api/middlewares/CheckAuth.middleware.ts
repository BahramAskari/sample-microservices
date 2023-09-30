import { Request, Response, NextFunction } from 'express'
import {LoginSession, User} from "../../db/models"
import jwt, {TokenExpiredError, JsonWebTokenError,} from "jsonwebtoken";
import {REQUEST} from "../routes";
import {LoginSession__Output} from "../../db/models/LoginSession";


export const CheckAuth = async (req: REQUEST, res: Response, next: NextFunction) => {
    try {
        // بررسی اینکه توکن در لیست سیاه نباشد
        /*
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
         */
        // check for auth header from client
        const header = req.headers.authorization

        if (!header) {
            next({ status: 403, message: "AUTH_HEADER_MISSING_ERR" })
            return
        }

        console.log(0)

        // verify  auth token
        const accessToken = header.split("Bearer ")[1]
        console.log(1)

        if (!accessToken) {
            return res.status(403).send("AUTH_TOKEN_MISSING_ERR");
        }

        //  const userId = verifyJwtToken(token,next)
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        // @ts-ignore
        const userId = decodedToken.userId
        console.log(2)

        if (!userId) return res.status(403).send("JWT_DECODE_ERR");

        const session: LoginSession__Output = await LoginSession.findOne({
            where: {accessToken: accessToken, blocked: false},
            include: [
                {model: User, paranoid: true, required: true, }
            ]
        })
        console.log(3)

        if (!session) return res.status(401).send("USER_SESSION_NOT_FOUND_ERR");

        //  await redis.get(`cache:blacklist:${session.id}`)

        req.UserId = session.User.id
        req.accessToken = session.accessToken
        req.refreshToken = session.refreshToken
        res.locals.user = session.User

        console.log(4)
        return next()

    } catch (err) {
        console.log(55)
        if (err instanceof TokenExpiredError) {
            // delete session? so how the clients will be able to use refreshToken?
            // by deleting a loginSession -> accessToken & refreshToken will be deleted and
            // add to redis cache blacklist
        }
        if (err instanceof JsonWebTokenError) {
        }
        return res.status(401).send("AUTHORIZATION_ERROR");
        // do some logging
        throw err
    }
}