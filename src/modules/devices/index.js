import { user } from "@src/api"
import Loader from "@src/components/loader"
import Header from "@src/components/header"
import { getCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect } from "react"
import DevicesTable from "./partials/devices"

export default function Devices(){

    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const user_id = getCookie("user_id")

    const meters = user.meters.all(user_id)
    return (
        <>
            <Header activeNavItem="devices"/>
            <div>
                {
                    !!meters ? <DevicesTable meters={meters.data.meters}/> : <Loader/>
                }
            </div>
        </>
    )
}