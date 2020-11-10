// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession, Handler } from 'next-iron-session';
import { NextReqWithSession } from '~/types';

export const saveSession = async ({ req }: { req: NextReqWithSession }) => {
  // usually we would have some business logic here that fetches the user data
  // for now some dummy data will do
  const session = {
    user_id: 1,
    name: 'John Doe',
    org_id: 123,
  };

  req.session.set('user', session);
  await req.session.save();

  return session;
};

export const withSession = (handler: Handler) =>
  withIronSession(handler, {
    password: 'supersecretcookiepassword',
    cookieName: `my-session-cookie`,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production', // so we can use the session in non-https environments like localhost for development
    },
  });
