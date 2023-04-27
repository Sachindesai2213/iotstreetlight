import { user } from "@src/api"
import Loader from "@src/components/loader"
import Header from "@src/components/header"
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

    const devices = user.devices.all()
    console.log(devices)

    return (
        <>
            <Header activeNavItem="devices"/>
            <div>
                {
                    !!devices ? <DevicesTable devices={devices.data}/> : <Loader/>
                }
            </div>
        </>
    )
}