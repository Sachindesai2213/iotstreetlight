import Image from "next/image";

export default function Icon(props){
    const {icon} = props
    return (
        <div className="w-6 h-6">
            <Image src={`/images/icons/${icon}.svg`} width={24} height={24}/>
        </div>
    )
}