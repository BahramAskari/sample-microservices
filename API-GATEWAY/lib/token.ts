import Jwt from "jsonwebtoken"
import User from "../db/models/User";
import LoginSession, {LoginSession__Output} from "../db/models/LoginSession";

export const createJwtToken = (payload) => {
    return Jwt.sign(payload, "JWT_SECRET", {expiresIn: "12h"});
};

export const verifyJwtToken = (token, next) => {
    try {
        // @ts-ignore
        const { userId } = Jwt.verify(token, "JWT_SECRET");
        return userId;
    } catch (err) {
        next(err);
    }
};


export const generateJwtTokenByEmail = async (email: string, userId: number): Promise<string> => {
    return Jwt.sign({email, userId}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: "24h"});
}
export const generateJwtRefreshTokenByEmail = async (email: string, userId: number): Promise<string> => {
    return Jwt.sign({email, userId}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: "12d"});
}
export const generateJwtToken = async (phone: string, userId: number): Promise<string> => {
    return Jwt.sign({phone, userId}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: "24h"});
}
export const generateJwtRefreshToken = async (phone: string, userId: number): Promise<string> => {
    return Jwt.sign({phone, userId}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: "12d"});
}


export const checkValidRefreshToken = async (refreshToken: string): Promise<{isValid: boolean, session?: LoginSession__Output, iat?: number, exp?: number}> => {
    try {
        const decodedRefreshToken = Jwt.verify(String(refreshToken), process.env.JWT_REFRESH_TOKEN_SECRET);
        // @ts-ignore
        const {iat, exp, userId, email} = decodedRefreshToken
        // @ts-ignore
        if (email && userId) {
            const session = await LoginSession.findOne({
                where: {refreshToken, blocked: false},
                include: [
                    {
                        model: User, where: {id: userId, email},
                        required: true, paranoid: false
                    }
                ],
            })
            return {isValid: session && session.refreshToken === refreshToken, session: session};
        }
        return {isValid: false,}

    } catch (e) {return {isValid: false,}}
}


export const checkValidAccessToken = async (accessToken: string): Promise<{ isValid: boolean, session?: LoginSession__Output, iat?: number, exp?: number }> => {
    try {
        const decodedAccessToken = Jwt.verify(String(accessToken), process.env.JWT_ACCESS_TOKEN_SECRET);
        // @ts-ignore
        const {iat, exp, userId, email} = decodedAccessToken
        // @ts-ignore
        if (email && userId) {
            const session = await LoginSession.findOne({
                where: {accessToken , blocked: false},
                include: [
                    {
                        model: User, where: {id: userId, email},
                        required: true, paranoid: false
                    }
                ]
            })
            return {isValid: session && session.accessToken === accessToken, session: session, iat, exp};
        }
        return {isValid: false,}

    } catch (e) {return {isValid: false,}}

}