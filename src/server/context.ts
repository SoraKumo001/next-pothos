import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

declare let global: { prisma?: PrismaClient };

export type Context = {
  res: NextApiResponse;
  req: NextApiRequest;
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
