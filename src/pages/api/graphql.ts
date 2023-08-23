import { ApolloServer } from "@apollo/server";
import { executeHTTPGraphQLRequest } from "@react-libraries/next-apollo-server";
import { Context, prisma } from "../../server/context";
import type { NextApiHandler } from "next";
import { schema } from "../../server";

/**
 * apolloServer
 */
const createApolloServer = async () => {
  const apolloServer = new ApolloServer<Context>({
    schema,
  });
  apolloServer.start();
  return apolloServer;
};

const apolloServer = createApolloServer();

/**
 * APIRoute handler for Next.js
 */
const handler: NextApiHandler = async (req, res) => {
  await executeHTTPGraphQLRequest({
    req,
    res,
    apolloServer: await apolloServer,
    context: async () => {
      return { req, res, prisma };
    },
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
