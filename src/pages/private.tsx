import { NextPage } from 'next';
import React from 'react';
import { User } from '~/types';
import { getUserFromServerSession } from '~/lib/auth';

type PrivatePageProps = {
  user: User;
};

const PrivatePage: NextPage<PrivatePageProps> = ({ user }) => {
  return (
    <section>
      <h2>👋 Hi, {user.name}</h2>
      This is a _private_ page. It can only be accessed if there is a valid access_token in the
      cookie. This token will be verified in the `getServerSideProps` function of this page. If
      there is no token or it is invalid, the user will get redirected to a login page.
    </section>
  );
};

export const getServerSideProps = getUserFromServerSession({ redirectToLogin: true });

export default PrivatePage;
