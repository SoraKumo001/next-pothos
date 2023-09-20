import { ApolloExplorer } from "@apollo/explorer/react";
import { printSchema } from "graphql";
import { GetStaticProps, NextPage } from "next";
import { schema } from "../app/libs/schema";

const Page: NextPage<{ schema: string }> = ({ schema }) => {
  return (
    <>
      <style>{`
        .explorer {
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
        }
      `}</style>
      <ApolloExplorer
        className="explorer"
        schema={schema}
        endpointUrl="/graphql"
        persistExplorerState={true}
        includeCookies={true}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { schema: printSchema(schema) },
  };
};

export default Page;
