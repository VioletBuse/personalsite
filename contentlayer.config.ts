import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: "./posts/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "the title of the post",
            required: true
        },
        date: {
            type: "date",
            description: "the date of the post",
            required: true
        }
    },
    computedFields: {
        urlName: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(".mdx", "")
        }
    }
}))

export const PortfolioItem = defineDocumentType(() => ({
    name: "PortfolioItem",
    filePathPattern: "./portfolio/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "the title of the post",
            required: true
        },
        demoUrl: {
            type: "string",
            description: "the url of the demo",
            required: true
        },
        githubUrl: {
            type: "string",
            description: "the url of the code",
            required: true
        }
    },
    computedFields: {
        urlName: {
            type: "string",
            resolve: item => item._raw.sourceFileName.replace(".mdx", "")
        }
    }
}))

export default makeSource({
    contentDirPath: "./content/",
    documentTypes: [Post, PortfolioItem]
})
