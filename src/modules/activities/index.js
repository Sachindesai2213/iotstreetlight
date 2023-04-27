import { user } from "@src/api"
import Loader from "@src/components/loader"
import Header from "@src/components/header"
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

    const activities = user.activities.all()
    return (
        <>
            <Header activeNavItem="activities"/>
            <div>
                {
                    !!activities ? <ActivitiesTable activities={activities.data}/> : <Loader/>
                }
            </div>
        </>
    )
}