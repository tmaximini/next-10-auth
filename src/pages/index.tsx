import React from 'react';
import Link from 'next/link'


const PublicPage = () => {
  return (
    <section>
      This is a public index page. It can be accessed by everyone. <br />
      You can try accessing the <Link href="/private">private Page</Link> or <Link href="/login">Login</Link>.
    </section>
  );
};

export default PublicPage;
