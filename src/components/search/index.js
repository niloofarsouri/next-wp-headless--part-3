'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"


function SearchBar() {

    const router = useRouter()
    const [data, setData] = useState({})


    const handleSearch = (event) => {
        event.preventDefault()
        const inputValue = event.target.value
        setData(inputValue)

        // const { search, value } = event.target
        // setData({ ...data, [search]: value })
    }

    const handleSubmite = (event) => {
        event.preventDefault()
        console.log(data)
        router.push(`/posts?search=${data}`)
    }

    return (
        <>
            <form onSubmit={handleSubmite} method="POST">
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className="border rounded-md py-1 px-2 text-sm"
                    // value={data}
                    onChange={handleSearch}
                />
            </form>


        </>
    )
}


export default SearchBar