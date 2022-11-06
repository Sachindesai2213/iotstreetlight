import Loader from "../loader"
import Button from "../button"
import { useRef, useState } from "react"
import Input from "../input"
import { useForm } from "react-hook-form"
import { getCookie } from "@src/utils/cookies"
import { user } from "@src/api"

export default function DateFilter(props){
    const {start_date, end_date, setPayload, additionalInputs, onSubmitForm} = props
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const {register, handleSubmit, formState:{errors}} = useForm()

    const formRef = useRef()

    const inputs = [
        {
            label: "Start Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
            },
            hook_form_name: "start_date",
            hook_form_options: {required: true, value: start_date},
            err: errors.start_date && (
                errors.start_date.type == "required" && "Please enter a Start Date"
            )
        },
        {
            label: "End Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
            },
            hook_form_name: "end_date",
            hook_form_options: {required: true, value: end_date},
            err: errors.end_date && (
                errors.end_date.type == "required" && "Please enter a End Date"
            )
        },
        ...additionalInputs || []
    ]

    return (
        <div className="py-2">
            <form id={formRef} onSubmit={handleSubmit(onSubmitForm)} autoComplete="off"></form>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-end">
                {
                    inputs.map((item, key) => {
                        return (
                            <div key={key}>
                                <Input {...item} attrs={{...item.attrs, ...register(item.hook_form_name, item.hook_form_options), form: formRef}}/>
                            </div>
                        )
                    })
                }
                <Button text="Filter" variant="primary" attrs={{form: formRef, type: "submit"}}/>
            </div>
            <hr className="my-2"/>
        </div>
    )
}