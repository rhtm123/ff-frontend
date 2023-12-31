import Link from "next/link"
export default function Error404 (){

    return(
        <div class="hero min-h-screen bg-base-100">
        <div class="hero-content text-center">
            <div class="">
            <h1 class="text-5xl font-bold py-8">Error 404 - Page Not Found</h1>
            <Link href="/">
            <button class="btn btn-primary">Home Page</button>
            </Link>
            </div>
        </div>
        </div>
    )
}