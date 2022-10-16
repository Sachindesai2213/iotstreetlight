import { user } from "@src/api"
import Loader from "@src/components/loader"
import Navbar from "@src/components/navbar"
import { getCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect } from "react"
import MetersTable from "./partials/meters"

export default function Meters(){

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
            <Navbar/>
            <div>
                {
                    !!meters ? <MetersTable meters={meters.data.meters}/> : <Loader/>
                }
            </div>
        </>
    )
}