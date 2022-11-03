import Link from "next/link"

export default function Nav(props){
    const {active} = props

    const NAV_ITEMS = [
        {
            name: "Dashboard",
            value: "dashboard",
            link: "/dashboard"
        },
        {
            name: "Reports",
            value: "reports",
            link: "/reports"
        },
        {
            name: "Analytics",
            value: "analytics",
            link: "/analytics"
        },
        {
            name: "Meters",
            value: "meters",
            link: "/meters"
        },
        {
            name: "Activities",
            value: "activities",
            link: "/activities"
        }
    ]
    return (
        <div className="w-full flex items-center justify-center">
            {
                NAV_ITEMS.map((item, key) => {
                    const isActive = item.value == active
                    return (
                        <Link href={item.link}>
                            <a>
                                <div className="px-5" key={key}>
                                    <p className={`font-base ${isActive ? "text-primary font-medium" : "text-gray1 hover:text-primary"}`}>{item.name}</p>
                                </div>
                            </a>
                        </Link>
                    )
                })
            }
        </div>
    )
}