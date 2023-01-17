import { user } from "@src/api";
import Loader from "@src/components/loader";
import DashboardTopCard from "@src/components/dashboard-top-card"
import Header from "@src/components/header"
import { isUserLoggedIn } from "@src/utils/functions"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { getCookie } from "@src/utils/cookies";

export default function Analytics(){
    const router = useRouter()

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const user_id = getCookie("user_id");

    const cards = user.dashboardData.get(user_id)

    // const TOP_CARDS = [
    //     {
    //         title: "TODAY",
    //         value: "₹ 53000",
    //         isIncreased: true,
    //         percentage: 30,
    //         icon: "usage",
    //         link: "/reports"
    //     },
    //     {
    //         title: "POWER",
    //         value: "₹ 53000",
    //         isIncreased: true,
    //         percentage: 30,
    //         icon: "power",
    //         link: "/reports"
    //     },
    //     {
    //         title: "ACTIVE METERS",
    //         value: "₹ 53000",
    //         isIncreased: true,
    //         percentage: 30,
    //         icon: "meters",
    //         link: "/meters"
    //     },
    //     {
    //         title: "FAULTS",
    //         value: "₹ 53000",
    //         isIncreased: true,
    //         percentage: 30,
    //         icon: "faults",
    //         link: "/faults"
    //     }
    // ]

    return (
        <>
            <Header activeNavItem="dashboard"/>
            <div className="p-8 bg-lightprimary">
                <div className="grid grid-cols-4 gap-8">
                    {!!cards ? (
                        cards.data.map((item, key) => {
                            return <DashboardTopCard {...item} key={key}/>
                        })
                    ) : (
                        <div className="col-span-4">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}