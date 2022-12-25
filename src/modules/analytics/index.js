import Loader from "@src/components/loader"
import Header from "@src/components/header"
import AnalyticsCard from "@src/components/analytics-card"
import { useEffect, useState } from "react"
import AddGraphs from "./partials/add-graphs"
import { getCookie, setCookie } from "@src/utils/cookies"

export default function Analytics(){

    // useEffect(() => {
    //     if(!isUserLoggedIn()){
    //         router.push(`/login?target=${router.asPath}`)
    //     }
    // }, [])

    const storedGraphs = getCookie("graphs")
    const [graphTypes, setGraphTypes] = useState([])

    useEffect(() => {
        setGraphTypes(storedGraphs?.split(",") || [])
    }, [storedGraphs])

    const onAddGraph = (type) => {
        setGraphTypes([...graphTypes, type])
        setCookie("graphs", [...graphTypes, type].join(","))
    }

    return (
        <>
            <Header activeNavItem="analytics"/>
            <AddGraphs addGraph={onAddGraph}/>
            <div className="p-5 grid grid-cols-2 gap-3">
                {
                    graphTypes.reverse().map((item, key) => <AnalyticsCard type={item} key={key}/>)
                }
            </div>
        </>
    )
}