import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { createYoga } from "graphql-yoga";
import jsonwebtoken from "jsonwebtoken";
import { Context, prisma } from "../libs/context";
import { schema } from "../libs/schema";

const { handleRequest } = createYoga<Context>({
  schema,
  fetchAPI: { Response },
  plugins: [useCookies()],
  context: async ({ request: req }) => {
    const { cookieStore } = req;
    if (!cookieStore) throw new Error("cookieStore is undefined");
    const token = (await cookieStore.get("session"))?.value;
    const user = token
      ? await new Promise<
          { id: string; name: string; roles: string[] } | undefined
        >((resolve) => {
          jsonwebtoken.verify(token, "test", (_, data) => {
            resolve(
              typeof data === "object"
                ? (data.payload?.user as
                    | { name: string; id: string; roles: string[] }
                    | undefined)
                : undefined
            );
          });
        })
      : undefined;
    return { req, prisma, user, cookieStore };
  },
});

export { handleRequest as GET, handleRequest as POST };
