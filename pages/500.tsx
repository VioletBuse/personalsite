import { NextPage } from "next";
import Head from "next/head";

const InternalError: NextPage = () => {
	return (
		<div className="mx-auto max-w-2xl py-16 text-center">
			<Head>
				<title>Internal Server Error</title>
			</Head>

			<h1 className="mb-8 text-3xl font-bold">
				Internal Server Error
			</h1>
		</div>
	);
};

export default InternalError

