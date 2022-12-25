import { METER_PARAMETERS } from "@src/utils/globals";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../button";
import BarChart from "../charts/bar-chart";
import DateFilter from "../date-filter";
import Icon from "../icon";
import Input from "../input";
import Loader from "../loader";

export default function AnalyticsCard(props) {
    const { text, loading, type } = props
    
    const {register, handleSubmit, formState:{errors}, setValue, clearErrors} = useForm()

    const [chartData, setchartData] = useState({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Test',
                data: [10, 10, 20, 30, 10, 20, 4]
            }
        ]
    })



    let graph
    let additionalInputs

    switch(type){
        case "bar":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "line":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "comparison":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "histogram":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "radar":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "sum":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
        case "2d":
            graph = <BarChart chartData={chartData} />
            additionalInputs = ["parameter_select1", "parameter_select2"]
        break
    }

    const inputProps = {
        "parameter_select1": {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1",
                ...register("parameter1", {required: true}),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter1", val)
                clearErrors("parameter1")
            },
            err: errors.parameter1 && (
                errors.parameter1.type == "required" && "Required*"
            )
        },
        "parameter_select2": {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1",
                ...register("parameter2", {required: true}),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter2", val)
                clearErrors("parameter2")
            },
            err: errors.parameter2 && (
                errors.parameter2.type == "required" && "Required*"
            )
        }
    }

    const _additionalInputs = additionalInputs.map((item, key) => {
        return inputProps[item]
    })

    const onSubmitForm = (data) => {
        console.log(data)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="border-4 p-4 rounded-md">
            <div className="flex">
                <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off"></form>
                <DateFilter register={register} errors={errors} handleSubmit={handleSubmit} additionalInputs={_additionalInputs} onSubmitForm={onSubmitForm}/>
            </div>
            {graph}
        </div>
    );
}
