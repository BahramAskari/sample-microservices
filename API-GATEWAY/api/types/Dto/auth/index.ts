import { Optional } from "sequelize"



export type RegisterUserDTO  = {
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
}

export type LoginUserDTO  = {
    //username: string;
    email: string;
    password: string;
}
export type VerificationEmailResendDTO  = {
    email: string;
    password: string;
}
export type LoginUserPhoneDTO  = {
    //username: string;
    phone: string;
    //email?: string;
    password: string;
}


export type TokenCookieDTO = {
    tokenId: number;
    userId: number;
    expiresAt: number; // milliseconds
    code: string;
}
export type TokenEmailDTO = {
    tokenId: number;
    userId: number;
    expiresAt: number; // milliseconds
    code: string;
    jwt_token: string;
}

export type VerificationEmailDTO = {
    email: string;
    code: string;
    tokenId: number;
}
export type VerificationDTO = {
    code: string;
    tokenId: number;
    phone: string;
    hash: string;
}
export type VerificationEmailWaitingDTO = {
    tokenId: number;
    email: string;
    hash: string;
}
export type VerificationWaitingDTO = {
    code?: string;
    tokenId: number;
    phone: string;
    hash: string;
}

export type tokenDTO = {
    tokenId: number;
    userId: number;
    code: string;
    hash: string;
}

export type PhoneVerifiedLoginedDTO  = {
    code: string|number;
    token: string;      // JWT token which includes userId, tokenId
}


/*
  We have to declare the AuthorCreationAttributes to
  tell Sequelize and TypeScript that the property
   `name`, in this case, is optional to be passed at update time
*/

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}