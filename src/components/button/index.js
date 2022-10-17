import Icon from "../icon"
import Loader from "../loader"

export default function Button(props){
    const {text, variant, attrs, loading, icon, isIconButton, additionalClasses} = props

    let btnClass = "hover:bg-lightprimary"
    let textClass = ""

    switch(variant){
        case "primary":
            btnClass = "bg-primary"
            textClass = "text-white"
        break
        case "text":
            textClass = "text-primary"
        break
    }

    if(loading){
        return <Loader/>
    }
    return (
        <button className={`flex items-center justify-center h-11 ${isIconButton ? "w-11 rounded-full" : "w-full rounded-md"} transition-all duration-100 ${btnClass} ${additionalClasses}`} {...attrs}>
            {
                !!text && <p className={`text-base ${textClass}`}>{text}</p>
            }
            {
                !!icon && <Icon icon={icon}/>
            }
        </button>
    )
}