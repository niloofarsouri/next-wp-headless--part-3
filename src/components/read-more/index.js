'use client'

import { useRouter } from "next/navigation"


export default function ReadMore() {

    const router = useRouter()

    return (
        <div className="text-center p-3">
            <button onClick={() => router.push('/contact')} className="underline">
                Click here to contact us
            </button>
        </div>
    )
}