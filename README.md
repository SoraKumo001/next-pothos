# pothos-generator

鋭意、作りかけ

## サンプルの実行方法

```sh
# dockerの起動
yarn dev:docker
# DBのマイグレーション
yarn prisma:migrate
# prismaのランタイム生成
yarn prisma:generate
# seed作成
yarn seed
# Next.jsの起動
yarn dev
```

## 概要

prisma の schema から GraphQL の schema を自動生成します

### Builder の設定

PrismaPlugin,PrismaUtil,PothosPrismaGeneratorPlugin を追加します  
認証機能を使用する際は ScopeAuthPlugin も追加する必要があります

```ts
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Context, prisma } from "./context";
import PrismaTypes from "./generated/pothos-types";
import { Prisma } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator-plugin";

/**
 * Create a new schema builder instance
 */
export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [
    PrismaPlugin,
    PrismaUtils,
    ScopeAuthPlugin,
    PothosPrismaGeneratorPlugin,
  ],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
  authScopes: async (context) => ({
    authenticated: !!context.user,
  }),
});

// Add custom scalar types
builder.addScalarType("DateTime", DateTimeResolver, {});
```

### Prisma のスキーマ設定

`@pothos-generator`で出力内容を制御します。
開発中で仕様が変更される可能性が大きいので詳細は省きます。

- query/mutation の自動出力設定  
  `find`,`findMany`,`create`,`createMany`,`update`,`updateMany`,`delete`,`deleteMany`
- query 時の`orderBy`,`where`の挿入
- オプションの追加による、認証機能の設定
- データ操作時の対象フィールドの制限

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

generator pothos {
  provider     = "prisma-pothos-types"
  clientOutput = "@prisma/client"
  output       = "../src/server/generated/pothos-types.ts"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

/// @pothos-generator action {"include":["create","update"]}
/// @pothos-generator select {"exclude":["email"]}
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String   @default("User")
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

/// @pothos-generator action {"exclude":["deleteMany"]}
/// @pothos-generator query {"where":{"published":true},"orderBy":{"title":"desc"}}
/// @pothos-generator option {"include":["mutation"],"params":{"authScopes":{"authenticated":true}}}
model Post {
  id          String     @id @default(uuid())
  published   Boolean    @default(false)
  title       String     @default("New Post")
  content     String     @default("")
  author      User?      @relation(fields: [authorId], references: [id])
  authorId    String?
  categories  Category[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  publishedAt DateTime   @default(now())
}

/// @pothos-generator query {"orderBy":{"name":"asc"}}
model Category {
  id        String   @id @default(uuid())
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
