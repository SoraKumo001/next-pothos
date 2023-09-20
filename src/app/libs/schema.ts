import { builder } from "./builder";
import "./resolvers";

export const schema = builder.toSchema({ sortSchema: false });
