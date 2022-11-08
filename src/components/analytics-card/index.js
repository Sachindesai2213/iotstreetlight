import { METER_PARAMETERS } from "@src/utils/globals";
import { useState, useRef } from "react";
import BarChart from "../charts/bar-chart";
import DateFilter from "../date-filter";
import Icon from "../icon";
import Input from "../input";
import Loader from "../loader";

export default function AnalyticsCard(props) {
    const { text, loading, type } = props
    
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
    }

    const inputProps = {
        "parameter_select1": {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1"
            },
            hook_form_name: "parameter1",
            hook_form_options: {required: true},
            options: METER_PARAMETERS
        },
        "parameter_select2": {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter2"
            },
            hook_form_name: "parameter2",
            hook_form_options: {required: true},
            options: METER_PARAMETERS
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
                <DateFilter additionalInputs={_additionalInputs} onSubmitForm={onSubmitForm}/>
            </div>
            {graph}
        </div>
    );
}
