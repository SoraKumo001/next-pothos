import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { printSchema } from "graphql";
import { createYoga } from "graphql-yoga";
import { getJWT } from "../libs/getJWT";
import { Context, prisma } from "../pothos/context";
import { schema } from "../pothos/schema";

const { handleRequest } = createYoga<{}, Context>({
  schema,
  fetchAPI: { Response },
  plugins: [useCookies()],
  context: async ({ request: req }) => {
    const { cookieStore } = req;
    if (!cookieStore) throw new Error("cookieStore is undefined");
    const token = (await cookieStore.get("session"))?.value;
    const user = await getJWT<Pick<Context, "user">>(token).then(
      (v) => v?.user
    );
    return { req, prisma, user, cookieStore };
  },
});

export { handleRequest as POST };
