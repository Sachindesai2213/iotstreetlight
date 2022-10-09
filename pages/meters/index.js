import Meters from "@src/modules/meters";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MetersPage() {

    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push("/login")
        }
    }, [])
    return <Meters/>
}
  