import { allPortfolioItems, PortfolioItem } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = allPortfolioItems.map(item => ({
        params: {slug: item.urlName}
    }))

    return {
        paths, fallback: false
    }
}

export const getStaticProps: GetStaticProps<{item: PortfolioItem}> = async ctx => {
    const params = ctx.params

    if (!params) {
        throw new Error("Portfolio GetStaticProps no Params")
    }

    const item = allPortfolioItems.find(item => item.urlName === params.slug)

    if (!item) {
        throw new Error("Portfolio Item not found " + params.slug)
    }

    return {
        props: {
            item
        }
    }

}

const PortfolioLayout: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({item}) => {
    const MDXContent = useMDXComponent(item.body.code) 

    return (
        <>
            <Head>
                <title>{item.title}</title>
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
						{item.title}
					</h1>
				</div>
				<MDXContent />
			</article>
        </>
    )
}

export default PortfolioLayout
