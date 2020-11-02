import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import React from 'react';
import { User } from '~/types';
import { getToken, login, logout, verifyToken } from '~/util/auth'

type Props = {
    user?: User
}

const LoginPage: NextPage<Props> = ({ user }) => {
  return (
    <section>
      You are currently {user ? 'logged in' : 'not logged in'}. <br/>
      {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
      
    </section>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Props> {

    console.info("getServerSideProps called")

    try {
      const token = getToken(context)
  
      if (!token) throw new Error('unauthorized')
  
      const user = verifyToken(token) as User

      console.info({ user})
  
      if (!user) throw new Error('unauthorized')
  
      return {
        props: {
          user
        },
      };
  
    } catch (err) {

        console.info(err)

      return {
        props: {}
      }
    }
  }
  
  

export default LoginPage;
