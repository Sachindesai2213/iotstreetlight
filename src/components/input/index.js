import Image from "next/image"
import { useRef } from "react"

export default function Input(props){
    const {label, leftIcon, attrs, err} = props
    const inputRef = useRef()
    return (
        <div>
            {
                label && <label htmlFor={inputRef} className="text-xs mb-0.5">{label}</label>
            }
            <div className="relative">
                <input id={inputRef} ref={inputRef} className={`h-11 border border-lightprimary w-full rounded-md px-5 font-base text-primary transition-all duration-150 focus:bg-grey6 ${leftIcon ? "pl-16" : ""}`} {...attrs}/>
                <div className="absolute left-5 transform -translate-y-1/2 top-1/2 h-6">
                    <Image width={24} height={24} src={`/images/icons/${leftIcon}.svg`}/>
                </div>
            </div>
            {
                err && <p className="error">{err}</p>
            }
        </div>
    )
}