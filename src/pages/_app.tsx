import type { AppContext, AppProps } from "next/app";
import { UrqlProvider } from "@/components/Provider/UrqlProvider";
import { getHost } from "@/libs/getHost";

const App = ({
	Component,
	pageProps,
}: AppProps<{ host?: string; cookie?: string }>) => {
	const { cookie, host } = pageProps;
	return (
		<UrqlProvider host={host} cookie={cookie} endpoint="/graphql">
			<Component {...pageProps} />
		</UrqlProvider>
	);
};

App.getInitialProps = async (context: AppContext) => {
	// ホスト名とクッキーを渡す
	const req = context?.ctx?.req;
	const host = getHost(req);
	return {
		pageProps: {
			cookie: req?.headers?.cookie,
			host,
		},
	};
};

export default App;
