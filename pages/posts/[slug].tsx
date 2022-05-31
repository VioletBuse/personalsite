import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = allPosts.map((post) => ({
		params: { slug: post.urlName },
	}));

	console.log("paths: ", paths);

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{post: Post}> = async (ctx) => {
	const params = ctx.params;

	if (!params) {
		throw new Error("Post GetStaticProps no Params");
	}

	const post = allPosts.find((post) => post.urlName === params.slug);

	if (!post) {
    throw new Error("Post not found " + params.slug)
	}

	return {
		props: {
			post,
		},
	};
};

const PostLayout: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	post,
}) => {
	const MDXContent = useMDXComponent(post.body.code);

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<article className="mx-auto max-w-2xl py-16">
				<div className="mb-6 text-center">
					<Link href="/">
						<a className="text-center text-sm font-bold uppercase text-blue-700">
							Home
						</a>
					</Link>
				</div>
				<div className="mb-6 text-center">
					<h1 className="mb-1 text-3xl font-bold">
						{post.title}
					</h1>
					<time
						dateTime={post.date}
						className="text-sm text-slate-600"
					>
						{format(
							parseISO(post.date),
							"LLLL d, yyyy"
						)}
					</time>
				</div>
				<MDXContent />
			</article>
		</>
	);
};

export default PostLayout;
