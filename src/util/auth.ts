import { setCookie, destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'
import { GetServerSidePropsContext, NextPageContext } from 'next';

// This would usually be injected through a secure env variable
const JWT_SECRET = 'supersecretstring'

// usually we would do some password checking or logging in the user through a 3rd party service
// like Firebase or Auth0. For this example let's just generate a valid jwt token on login with some test content.
const _generateToken = (): string => jwt.sign({
    name: 'John Doe',
    id: 12345
}, JWT_SECRET)

// save the generated token in a cookie called 'token' that is expires in 1 hour
export const login = () => {
    const token = _generateToken()
    setCookie({}, 'token', token, { maxAge: 3600 })
}

// remove the auth cookie
export const logout = () => destroyCookie({}, 'token')

// retrieve the token from the cookie
export const getToken = (ctx?: NextPageContext | GetServerSidePropsContext) =>  parseCookies(ctx)?.token

// check if the token is valid
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET)