import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { executeHTTPGraphQLRequest } from "@react-libraries/next-apollo-server";
import jsonwebtoken from "jsonwebtoken";
import { schema } from "../../server";
import { Context, prisma } from "../../server/context";
import type { NextApiHandler } from "next";
/**
 * apolloServer
 */
const createApolloServer = async () => {
  const apolloServer = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
      const token = req.cookies.session;
      const user = token
        ? await new Promise<{ id: string; name: string } | undefined>(
            (resolve) => {
              jsonwebtoken.verify(token, "test", (_, data) => {
                resolve(
                  typeof data === "object"
                    ? (data?.payload?.user as
                        | { id: string; name: string }
                        | undefined)
                    : undefined
                );
              });
            }
          )
        : undefined;
      return { req, res, prisma, user };
    },
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
