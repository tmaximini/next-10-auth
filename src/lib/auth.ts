import { setCookie, destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { GetServerSidePropsContextWithSession, User } from '~/types';
import { withSession } from './session';

// This would usually be injected through a secure env variable
const JWT_SECRET = 'supersecretstring';

// usually we would do some password checking or logging in the user through a 3rd party service
// like Firebase or Auth0. For this example let's just generate a valid jwt token on login with some test content.
const _generateToken = (): string =>
  jwt.sign(
    {
      name: 'John Doe',
      id: 12345,
    },
    JWT_SECRET,
  );

// save the generated token in a cookie called 'token' that is expires in 1 hour
export const login = () => {
  const token = _generateToken();
  setCookie({}, 'token', token, { maxAge: 3600 });
};

// remove the auth cookie
export const logout = () => destroyCookie({}, 'token');

// retrieve the token from the cookie
export const getToken = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  parseCookies(ctx)?.token;

// check if the token is valid
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

/**
 *
 * @param {object} - {redirectToLogin: boolean}
 * This function can be used for getServerSideProps where we want to protect routes on the SSR level
 * The function will read the session cookie and return the parsed user object as a prop to the page.
 * If the user has no session they will be redirected to /login
 *
 * @returns {function} - The GetServerSideProps Handler function
 */
export const getUserFromServerSession = ({ redirectToLogin }: { redirectToLogin?: boolean }) =>
  withSession(async ({ req }: GetServerSidePropsContextWithSession<{}>) => {
    try {
      const user = req.session.get<User>('user');

      if (!user) throw new Error('unauthorized');

      return {
        props: {
          user,
        },
      };
    } catch (err) {
      if (redirectToLogin) {
        // now in stable: to return a redirect object
        // https://github.com/vercel/next.js/discussions/14890
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      } else {
        return {
          props: {},
        };
      }
    }
  });
