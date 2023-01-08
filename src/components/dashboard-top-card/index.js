import Link from "next/link"
import Icon from "../icon"

export default function DashboardTopCard(props){
    const {title, value, isIncreased, percentage, icon, link} = props
    return (
        <Link href={link || "#"}>
            <a>
                <div className="bg-white rounded-xl shadow-md p-5 flex h-32 hover:bg-gray-100 active:scale-95 transition-all duration-150">
                    <div className="flex-grow flex flex-col">
                        <h3 className="text-sm text-gray-500 uppercase">{title}</h3>
                        <h2 className="text-xl font-bold text-primary">{value}</h2>
                        <div className="flex-grow"></div>
                        <div className="flex items-center">
                            <p className={`text-base leading-4 font-bold ${isIncreased ? "text-green-500" : "text-red-500"}`}>{isIncreased ? "+" : "-"}{percentage}%</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <Icon icon={`dashboard/${icon}`}/>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}