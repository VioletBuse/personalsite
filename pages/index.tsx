import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post, allPortfolioItems, PortfolioItem } from 'contentlayer/generated'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import React from 'react'


export const getStaticProps: GetStaticProps<{posts: Post[], portfolioItems: PortfolioItem[]}> = async () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const portfolioItems = allPortfolioItems
  return { props: { posts, portfolioItems } }
}

const PostCard: React.FC<{post: Post}> = ({post}) => {
  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link href={`/posts/${post.urlName}`}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
    </div>
  )
}

const PortfolioCard: React.FC<{item: PortfolioItem}> = ({item}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg">
        <Link href={`/portfolio/${item.urlName}`}>
          <a className="text-blue-700 hover:text-blue-900">{item.title}</a>
        </Link>
      </h2>
    </div>
  )
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts, portfolioItems}) => {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}

      {portfolioItems.map((item, idx) => (
        <PortfolioCard key={idx} item={item} />
      ))}
    </div>
  )
}

export default Home