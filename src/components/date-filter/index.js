import Loader from "../loader"
import Button from "../button"
import { useState } from "react"
import Input from "../input"
import { useForm } from "react-hook-form"
import { getCookie } from "@src/utils/cookies"
import { user } from "@src/api"

export default function DateFilter(props){
    const {start_date, end_date, setPayload, additionalInputs} = props
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    const {register, handleSubmit, formState:{errors}} = useForm()

    const user_id = getCookie("user_id")

    const inputs = [
        {
            label: "Start Date",
            leftIcon: "account-circle-primary",
            attrs: {
                form: "date-filter-form",
                type: "date",
                ...register("start_date", {required: true, value: start_date}),
            },
            err: errors.start_date && (
                errors.start_date.type == "required" && "Please enter a Start Date"
            )
        },
        {
            label: "End Date",
            leftIcon: "account-circle-primary",
            attrs: {
                form: "date-filter-form",
                type: "date",
                ...register("end_date", {required: true, value: end_date}),
            },
            err: errors.end_date && (
                errors.end_date.type == "required" && "Please enter a End Date"
            )
        },
        // ... additionalInputs
    ]

    const filteredData = (data) => {
        setLoading(true)
        setErr(null)
        data['user_id'] = user_id
        setPayload(data)
        setLoading(false)
    }

    if(loading){
        return <Loader/>
    }

    return (
        <div className="py-2">
            <form id="date-filter-form" className="grid grid-cols-3 gap-6 items-end" onSubmit={handleSubmit(filteredData)} autoComplete="off">
                {
                    inputs.map((item, key) => {
                        return (
                            <div key={key}>
                                <Input {...item}/>
                            </div>
                        )
                    })
                }
                <Button text="Filter" variant="primary" attrs={{form: "date-filter-form", type: "submit"}} loading={loading}></Button>
            </form>
            <hr className="my-2"/>
        </div>
    )
}