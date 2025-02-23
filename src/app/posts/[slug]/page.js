import { getPostBySlug } from "@/lib/queries"





async function Post({ params }) {

    const slug = (await params).slug
    console.log(slug)
    const slugPost = await getPostBySlug(slug)
    console.log(slugPost)


    return (
        <>
            <h1 className="text-3xl text-center">hi from single post</h1>
            {JSON.stringify(slugPost)}
        </>
    )
}


export default Post