import { user } from "@src/api"
import Loader from "@src/components/loader"
import Navbar from "@src/components/navbar"
import { getCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect } from "react"
import ActivitiesTable from "./partials/activities-table"

export default function Activities(){

    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const user_id = getCookie("user_id")

    const activities = user.activities.all(user_id)
    return (
        <>
            <Navbar/>
            <div>
                {
                    !!activities ? <ActivitiesTable activities={activities.data.activities}/> : <Loader/>
                }
            </div>
        </>
    )
}