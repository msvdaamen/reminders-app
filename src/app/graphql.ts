
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface LoginInput {
    username: string;
    password: string;
}

export interface RegisterInput {
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface AuthUser {
    user: User;
    accessToken: string;
}

export interface IMutation {
    login(loginInput: LoginInput): AuthUser | Promise<AuthUser>;
    register(registerInput: RegisterInput): AuthUser | Promise<AuthUser>;
}

export interface IQuery {
    me(): AuthUser | Promise<AuthUser>;
}

export interface User {
    id: string;
    name?: string;
    username: string;
}
