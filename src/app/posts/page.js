import LatestPost from "@/components/latest-post"
import { getAllPosts } from "@/lib/queries"


// const { slug } = params
// const { query } = searchParams

async function Posts(props) {

    const searchParams = await props.searchParams
    console.log(searchParams) //{search : css}

    const searchValue = searchParams.search
    const searchCategory = searchParams.categories
    console.log(searchValue, searchCategory)

    const before = searchParams.before
    const after = searchParams.after
    console.log(before,after)


    //get all posts

    const { nodes, pageInfo } = await getAllPosts(searchValue, searchCategory, { before, after })

    const latestPostProps = {
        searchValue,
        searchCategory,
        nodes,
        pageInfo
    }


    return (
        <>
            <div className="w-auto">
                <h1 className="text-2xl text-center text-cyan-700 p-6">Post</h1>

                <div>
                    <LatestPost {...latestPostProps} />
                </div>
            </div>
        </>
    )
}


export default Posts