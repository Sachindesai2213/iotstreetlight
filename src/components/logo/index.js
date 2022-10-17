import Image from "next/image";
import Link from "next/link";

export default function(){
    return (
        <Link href="/">
            <a>
                <div className="">
                    <p className="text-sm text-primary">Logo</p>
                </div>
            </a>
        </Link>
    )
}