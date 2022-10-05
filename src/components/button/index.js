export default function Button(props){
    const {text, variant, attrs} = props

    let btnClass = ""
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
    return (
        <button className={`h-11 rounded-md w-full transition-all duration-100 ${btnClass}`} {...attrs}>
            <p className={`text-base ${textClass}`}>{text}</p>
        </button>
    )
}