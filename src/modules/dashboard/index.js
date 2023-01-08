import DashboardTopCard from "@src/components/dashboard-top-card"
import Header from "@src/components/header"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Analytics(){
    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const TOP_CARDS = [
        {
            title: "TODAY",
            value: "₹ 53000",
            isIncreased: true,
            percentage: 30,
            icon: "usage",
            link: "/analytics"
        },
        {
            title: "POWER",
            value: "₹ 53000",
            isIncreased: true,
            percentage: 30,
            icon: "power",
            link: "/analytics"
        },
        {
            title: "ACTIVE METERS",
            value: "₹ 53000",
            isIncreased: true,
            percentage: 30,
            icon: "meters",
            link: "/meters"
        },
        {
            title: "FAULTS",
            value: "₹ 53000",
            isIncreased: true,
            percentage: 30,
            icon: "faults",
            link: "/reports"
        }
    ]

    return (
        <>
            <Header activeNavItem="dashboard"/>
            <div className="p-8 bg-lightprimary">
                <div className="grid grid-cols-4 gap-8">
                    {
                        TOP_CARDS.map((item, key) => {
                            return <DashboardTopCard {...item} key={key}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}