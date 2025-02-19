import Link from "next/link"



function MyHeader() {


    return (
        <>
            <header className="flex w-full h-auto mb-2 md:mb-5">
                <div className="w-full h-auto flex justify-between">
                    <ul className="flex justify-center">
                        <Link href={'/'}>
                            <li className="p-3 shadow-header hover:bg-slate-50 hover:text-sky-800">Home</li>
                        </Link>

                        <Link href={'/dashboard'}>
                            <li className='p-3 shadow-header hover:bg-slate-50 hover:text-sky-800'>Dashboard</li>
                        </Link>

                        <Link href={'/contact'}>
                            <li className='p-3 shadow-header hover:bg-slate-50 hover:text-sky-800'>Contact Us</li>
                        </Link>

                        <Link href={'/posts'}>
                            <li className='p-3 shadow-header hover:bg-slate-50 hover:text-sky-800'>Posts</li>
                        </Link>
                    </ul>

                    <ul className="flex justify-center">
                        <Link href={'/login'}>
                            <li className='p-3 shadow-header hover:bg-slate-50 hover:text-sky-800'>Login</li>
                        </Link>

                        <Link href={'/signup'}>
                            <li className='p-3 shadow-header hover:bg-slate-50 hover:text-sky-800'>Sign Up</li>
                        </Link>
                    </ul>
                </div>
            </header>
        </>
    )
}


export default MyHeader