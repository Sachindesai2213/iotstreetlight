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

    return (
        <>
            <Header activeNavItem="dashboard"/>
            <h1>Dashboard</h1>
        </>
    )
}