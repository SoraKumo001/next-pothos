import {
  NextSSRProvider,
  createNextSSRExchange,
} from "@react-libraries/next-exchange-ssr";
import { ReactNode, useMemo } from "react";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";

const isServerSide = typeof window === "undefined";

export const UrqlProvider = ({
  host,
  cookie,
  endpoint,
  children,
}: {
  host?: string;
  cookie?: string;
  endpoint: string;
  children: ReactNode;
}) => {
  const client = useMemo(() => {
    const nextSSRExchange = createNextSSRExchange();
    const url = isServerSide ? `${host}${endpoint}` : endpoint;
    return new Client({
      url,
      fetchOptions: {
        headers: {
          "apollo-require-preflight": "true",
          cookie: cookie ?? "",
        },
      },
      suspense: isServerSide,
      exchanges: [cacheExchange, nextSSRExchange, fetchExchange],
    });
  }, [host, endpoint, cookie]);
  return (
    <Provider value={client}>
      <NextSSRProvider>{children}</NextSSRProvider>
    </Provider>
  );
};
