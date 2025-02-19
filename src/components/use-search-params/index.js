'use client'

import { useSearchParams } from "next/navigation"



function SearchPostsPage() {

    const searchParams = useSearchParams()
    console.log(searchParams)
    const searchValue = searchParams.get('search')
    const searchCategory = searchParams.get('categories')

    console.log(searchValue, searchCategory)



    return (
        <>
            <div className="w-full p-5">
                <p>Search: {searchValue}</p>
                <p>Category: {searchCategory}</p>
            </div>
        </>
    )
}


export default SearchPostsPage