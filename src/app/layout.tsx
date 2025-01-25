import { UrqlProvider } from "@/components/Provider/UrqlProvider";
import { getHost } from "@/libs/getHost";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const host = await getHost();
  return (
    <html lang="en">
      <body>
        <UrqlProvider
          host={host}
          cookie={cookie.toString()}
          endpoint="/graphql"
        >
          {children}
        </UrqlProvider>
      </body>
    </html>
  );
}
