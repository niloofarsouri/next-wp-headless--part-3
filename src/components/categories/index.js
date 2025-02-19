import Link from "next/link"




function Categories({ categories }) {

    // console.log({ categories })
    return (
        <>
            <h1 className="text-center text-xl text-sky-700 p-3">categories:</h1>
            
            <div className="w-full p-3 my-3 h-auto flex justify-center">
                {
                    categories.map(item => {
                        return (
                            // <div key={item.id} className="border-2 py-1 px-2">
                            //     <h3 className="p-1 my-2">{item.name}</h3>
                            // </div>

                            <ul className="text-[0.7rem] uppercase gap-2 w-auto">
                                <li key={item.id}>
                                    <Link href={`/posts?categories=${item.slug}`}
                                        className="hover:underline p-1 border rounded-md"
                                    >{item.name}</Link>
                                </li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Categories