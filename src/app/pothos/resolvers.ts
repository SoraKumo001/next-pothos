import jsonwebtoken from "jsonwebtoken";
import { builder } from "./builder";
import { Context } from "./context";
// Example of how to add a custom auth query
builder.mutationType({
  fields: (t) => {
    return {
      // Example of how to add a custom auth query
      // This query will return true if the user is authenticated
      signIn: t.boolean({
        args: { email: t.arg({ type: "String", required: true }) },
        resolve: async (_root, { email }, ctx) => {
          const { id, name, roles } = await ctx.prisma.user.findUniqueOrThrow({
            where: { email },
          });
          const secret = process.env.SECRET ?? "";
          const user: Context["user"] = { id, name, roles };
          const token = jsonwebtoken.sign({ payload: { user: user } }, secret);
          const { cookieStore } = ctx;
          cookieStore.set({
            name: "session",
            value: token,
            path: "/",
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            domain: null,
          });

          return true;
        },
      }),
      // Example of how to add a custom auth query
      // and will clear the session cookie
      signOut: t.boolean({
        resolve: (_root, _args, ctx) => {
          const { cookieStore } = ctx;
          cookieStore.set({
            name: "session",
            value: "",
            path: "/",
            expires: 0,
            domain: null,
          });
          return true;
        },
      }),
    };
  },
});
