import Image from "next/image"
import { useRef, useState } from "react"

export default function Input(props){
    const {label, leftIcon, attrs, err, options} = props
    const inputRef = useRef()

    const [showOptions, setShowOptions] = useState(false)

    const onClickSelectBox = (e) => {
        const selectBox = e.target
        if(!!options){
            setShowOptions(!showOptions)
            window.addEventListener("click", function(e){   
                if (selectBox.contains(e.target)){
                    setShowOptions(!showOptions)
                } else{
                    window.removeEventListener("click", function(){})
                    setShowOptions(false)
                }
            });
        }
    }

    const onClickOption = (option) => {
        inputRef.current.value = option.value
        setShowOptions(false)
    }

    return (
        <div className="relative" onClick={onClickSelectBox}>
            {
                label && <label htmlFor={inputRef} className="text-xs mb-0.5">{label}</label>
            }
            <div className="relative">
                <input id={inputRef} ref={inputRef} className={`h-11 border border-lightprimary w-full rounded-md px-5 font-base text-primary transition-all duration-150 focus:bg-grey6 ${leftIcon ? "pl-16" : ""}`} {...attrs} readOnly={!!options}/>
                {
                    !!leftIcon && (
                        <div className="absolute left-5 transform -translate-y-1/2 top-1/2 h-6">
                            <Image width={24} height={24} src={`/images/icons/${leftIcon}.svg`}/>
                        </div>
                    )
                }
            </div>
            {
                err && <p className="error">{err}</p>
            }
            {
                !!options && showOptions && (
                    <div className="absolute top-full left-0 w-full shadow-md ronded-md bg-white">
                        {
                            options.map((item, key) => {
                                return (
                                    <div key={key} className="p-3 hover:bg-gray-100" onClick={() => onClickOption(item)}>
                                        <p>{item.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}