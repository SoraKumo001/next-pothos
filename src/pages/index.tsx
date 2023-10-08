import { ApolloExplorer } from "@apollo/explorer/react";
import { SCHEMA_RESPONSE } from "@apollo/explorer/src/helpers/constants";
import { printSchema } from "graphql";
import { generate } from "graphql-auto-query";
import { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { schema } from "../app/pothos/schema";

const Page: NextPage<{ schema: string }> = ({ schema }) => {
  // Set up auto-generated queries
  useEffect(() => {
    const onMessage = () => {
      const iframe = document.querySelector("iframe");
      iframe?.contentWindow?.postMessage(
        {
          name: "SetOperation",
          variables: "",
          operation: generate(schema),
        },
        "https://explorer.embed.apollographql.com"
      );
    };
    addEventListener("load", onMessage);
    return () => removeEventListener("load", onMessage);
  }, []);

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
        handleRequest={(url, option) =>
          fetch(url, { ...option, credentials: "same-origin" })
        }
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
