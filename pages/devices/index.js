import Devices from "@src/modules/devices";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DevicesPage() {

    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push("/login")
        }
    }, [])
    return <Devices/>
}
  