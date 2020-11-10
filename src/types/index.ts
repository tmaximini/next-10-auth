import { Session } from 'next-iron-session';
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, NextApiRequest } from 'next';

export type User = {
  name: string;
  id: number;
};

export interface NextReqWithSession extends NextApiRequest {
  readonly session: Session;
}

export interface GetServerSidePropsContextWithSession<Params extends ParsedUrlQuery>
  extends GetServerSidePropsContext<Params> {
  readonly req: IncomingMessage & { readonly session: Session };
}
