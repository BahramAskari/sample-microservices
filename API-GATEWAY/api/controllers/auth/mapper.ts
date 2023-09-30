import {User__Attributes, User__Output} from '../../../db/models/User'



export const toUser = (user: User__Output): User__Attributes  => {
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        sign: user.sign,
        email: user.email,

        password: user.password,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}

export const toSignedIn = (item: {accessToken: string, refreshToken: string}): {accessToken: string, refreshToken: string,} => {
    return {
        accessToken: item.accessToken,
        refreshToken: item.accessToken,
    }
}