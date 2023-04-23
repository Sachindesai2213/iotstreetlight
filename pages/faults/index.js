import Faults from "@src/modules/faults";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function FaultsPage() {

    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push("/login")
        }
    }, [])
    return <Faults/>
}