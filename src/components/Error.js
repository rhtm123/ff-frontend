import Link from "next/link"
export default function Error (){

    return(
        <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
            <div className="">
            <h1 className="text-5xl font-bold py-8">Something Went Wrong</h1>
            <Link href="/">
            <button className="btn btn-primary">Home Page</button>
            </Link>
            </div>
        </div>
        </div>
    )
}