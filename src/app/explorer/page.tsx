import { printSchema } from "graphql";
import { schema } from "../pothos/schema";
import { ApolloExplorer } from "apollo-explorer";

const document = `query FindManyPost {
  findManyPost {
    id
    published
    title
    content
    authorId
    categoriesCount
    createdAt
    updatedAt
    publishedAt
  }
}`;

const Page = () => {
  return (
    <ApolloExplorer
      className="h-screen"
      explorer={{
        endpointUrl: "/graphql",
        schema: printSchema(schema), // If the schema already exists
        // introspectionInterval: 5000, // If the schema is to be retrieved periodically
        initialState: {
          document,
        },
      }}
    />
  );
};

export default Page;
