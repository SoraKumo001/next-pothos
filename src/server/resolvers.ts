import { builder } from "./builder";
import { serialize } from "cookie";
import jsonwebtoken from "jsonwebtoken";
// Example of how to add a custom auth query
builder.mutationType({
  fields: (t) => {
    return {
      // Example of how to add a custom auth query
      // This query will return true if the user is authenticated
      signIn: t.boolean({
        args: { email: t.arg({ type: "String", required: true }) },
        resolve: async (_root, { email }, ctx, _info) => {
          const user = await ctx.prisma.user.findUniqueOrThrow({
            where: { email },
          });
          const token = jsonwebtoken.sign({ payload: { user: user } }, "test");
          const res = ctx.res;
          res.setHeader(
            "Set-Cookie",
            serialize("session", token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })
          );
          return true;
        },
      }),
      // Example of how to add a custom auth query
      // and will clear the session cookie
      signOut: t.boolean({
        resolve: (_root, args, ctx, _info) => {
          const token = jsonwebtoken.sign(
            { payload: { user: args.user } },
            "test"
          );
          const res = ctx.res;
          res.setHeader(
            "Set-Cookie",
            serialize("session", token, {
              maxAge: 0,
              path: "/",
            })
          );
          return true;
        },
      }),
    };
  },
});
