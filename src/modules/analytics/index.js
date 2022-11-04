import { user } from "@src/api"
import Loader from "@src/components/loader"
import Header from "@src/components/header"
import { getCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AnalyticsTable from "./partials/analytics-table"
import DateFilter from "@src/components/date-filter"

export default function Analytics(){
    const date = new Date()
    const iso_date_format = date.toISOString().split('T')[0]
    const user_id = getCookie("user_id")
    const router = useRouter()

    const [payload, setPayload] = useState({
        user_id: user_id,
        start_date: iso_date_format,
        end_date: iso_date_format,
    })

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const analytics = user.analytics.all(payload)
    return (
        <>
            <Header activeNavItem="analytics"/>
            <div className="p-5">
                <DateFilter start_date={iso_date_format} end_date={iso_date_format} type="analytics" setPayload={setPayload}/>
                {
                    !!analytics ? <AnalyticsTable analytics={analytics.data.analytics}/> : <Loader/>
                }
            </div>
        </>
    )
}