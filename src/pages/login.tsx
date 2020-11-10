import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import React from 'react';
import { User } from '~/types';
import { getToken, getUserFromServerSession, login, logout, verifyToken } from '~/lib/auth';

type Props = {
  user?: User;
};

const LoginPage: NextPage<Props> = ({ user }) => {
  return (
    <section>
      You are currently {user ? 'logged in' : 'not logged in'}. <br />
      {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
    </section>
  );
};

export const getServerSideProps = getUserFromServerSession({ redirectToLogin: false });

export default LoginPage;
