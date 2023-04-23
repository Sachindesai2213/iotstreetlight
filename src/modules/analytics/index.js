import Header from "@src/components/header"
import AnalyticsCard from "@src/components/analytics-card"
import { useEffect, useState } from "react"
import AddGraphs from "./partials/add-graphs"
import { deleteCookie, getCookie, setCookie } from "@src/utils/cookies"
import { isUserLoggedIn } from "@src/utils/functions"

export default function Analytics(){

    useEffect(() => {
        if(!isUserLoggedIn()){
            router.push(`/login?target=${router.asPath}`)
        }
    }, [])

    const storedGraphs = getCookie("graphs")
    const [graphTypes, setGraphTypes] = useState([])

    useEffect(() => {
        setGraphTypes(storedGraphs?.split(",") || [])
    }, [storedGraphs])

    const onAddGraph = (type) => {
        console.log(type)
        setGraphTypes([type, ...graphTypes])
        setCookie("graphs", [type, ...graphTypes].join(","))
    }
    
    const onRemoveGraph = (index) => {
        let temp = graphTypes
        temp.splice(index, 1)
        setGraphTypes([...temp])
        if(temp.length == 0){
            deleteCookie("graphs")
            return
        }
        setCookie("graphs", [...temp].join(","))
    }

    return (
        <>
            <Header activeNavItem="analytics"/>
            <AddGraphs addGraph={onAddGraph}/>
            <div className="p-5 grid grid-cols-2 gap-3">
                {
                    graphTypes.map((item, key) => <AnalyticsCard type={item} index={key} key={key} onRemoveGraph={onRemoveGraph}/>)
                }
            </div>
        </>
    )
}