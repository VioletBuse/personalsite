import { NextPage } from "next";
import Head from "next/head";

const NotFound: NextPage = () => {
	return (
		<div className="mx-auto max-w-2xl py-16 text-center">
			<Head>
				<title>Page Not Found</title>
			</Head>

			<h1 className="mb-8 text-3xl font-bold">
				Page Not Found
			</h1>
		</div>
	);
};

export default NotFound
