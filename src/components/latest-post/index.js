import Link from "next/link"
import SearchBar from "../search"



function LatestPost({ slug, title, searchValue, searchCategory, nodes, pageInfo }) {

    // console.log({ allPosts })

    // console.log(allPosts.pageInfo)

    // if (allPosts?.length === 0) {
    //     return <div>No Posts yet !</div>
    // }

    return (
        <>
            <div className="flex flex-col w-auto min-h-screen p-4 mb-4">
                <div className="w-full mx-5 p-2 flex justify-between">

                    <div className="w-auto p-2">
                        <h1>Lastest post</h1>
                    </div>

                    <div className="w-auto p-2">
                        <SearchBar />
                    </div>

                </div>

                <div className="flex flex-col p-4">
                    {/* {JSON.stringify(nodes)} */}

                    <div className="w-auto p-2">
                        {
                            nodes.map(item => {
                                return (
                                    <Link href={`/posts/${item.slug}`}>
                                        <div key={item.id} className="p-2 mb-3 border-b rounded-sm">
                                            <h1>{item.title}</h1>
                                            <h3>SLUG : {item.slug}</h3>
                                            {/* <p>{new Date(item.date).toLocaleDateString("de-De")}</p> */}
                                            <p>{item.date}</p>
                                            <p>{item.excerpt}</p>

                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    <div className="w-auto p-2">
                        <div key={pageInfo.id} className="p-2 mb-3 border-2 rounded-sm">
                            <p>endCursor: {pageInfo.endCursor}</p>
                            <p>hasNextPage: {pageInfo.hasNextPage}</p>
                            <p>hasPreviousPage: {pageInfo.hasPreviousPage}</p>
                            <p>startCursor: {pageInfo.startCursor}</p>
                        </div>
                    </div>
                </div>


                {/* <section>
                    {
                        (searchValue == slug) 
                        ? <Link href={`/posts/${slug}`}></Link> => getPostBySlug()
                        : <Link href={'/posts'}>Sorry...</Link>
                    }
                </section> */}


                {/* Next & prev button */}

                {(pageInfo?.hasPreviousPage || pageInfo?.hasNextPage) ? (



                    <div div className="w-4/5 p-2 flex justify-between">
                        <div className="w-1/2 p-2">
                            {pageInfo?.hasNextPage && (
                                <Link href={{
                                    pathname: '/posts',
                                    query: {
                                        after: pageInfo.endCursor,
                                        // ...((searchValue || searchCategory) && { searchValue, searchCategory })
                                    }
                                }}>
                                    Next
                                </Link>
                            )}
                        </div>

                        <div className="w-1/2 p-2">
                            {pageInfo?.hasPreviousPage && (
                                <Link href={{
                                    pathname: '/posts',
                                    query: {
                                        before: pageInfo.startCursor,
                                        // ...((searchValue || searchCategory) && { searchValue, searchCategory })
                                    }
                                }}>
                                    Prev
                                </Link>
                            )}
                        </div>
                    </div>
                    // )}
                )
                    :

                    <div className="p-2 text-center">
                        <Link href={'/posts'}>
                            view more posts
                        </Link>
                    </div>
                }
            </div >
        </>
    )
}

export default LatestPost