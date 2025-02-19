import { getPostBySlug } from "@/lib/queries"





async function Post({params}){

    const post = (await params).slug
    console.log(post)
    const slugPost = await getPostBySlug(post)
    console.log(slugPost)


    return(
        <>
            <h1 className="text-3xl text-center">hi from single post</h1>
            {/* <p>{postId}</p> */}
            {JSON.stringify(slugPost)}
        </>
    )
}


export default Post