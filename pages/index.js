import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push("/login");
        } else {
            router.push("/dashboard");
        }
    }, []);
    return <div></div>;
}
