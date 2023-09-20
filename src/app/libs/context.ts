import { PrismaClient } from "@prisma/client";
import { CookieStore } from "@whatwg-node/cookie-store";

declare let global: { prisma?: PrismaClient };

export type Context = {
  cookieStore: CookieStore;
  req: Request;
  prisma: PrismaClient;
  user?: { name: string; id: string; roles: string[] };
};

global.prisma?.$disconnect();

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "stdout",
        level: "query",
      },
    ],
  });

global.prisma = prisma;
