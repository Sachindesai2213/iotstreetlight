import Loader from "@src/components/loader"
import Header from "@src/components/header"
import { getCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AnalyticsCard from "@src/components/analytics-card"

export default function Analytics(){
    const date = new Date()
    const iso_date_format = date.toISOString().split('T')[0]
    const user_id = getCookie("user_id")
    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    return (
        <>
            <Header activeNavItem="analytics"/>
            <div className="p-5 grid grid-cols-2 gap-3">
                <AnalyticsCard type="bar"/>
                <AnalyticsCard type="line"/>
            </div>
        </>
    )
}