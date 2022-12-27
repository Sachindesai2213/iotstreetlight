import { user } from "@src/api";
import { METER_PARAMETERS } from "@src/utils/globals";
import { useState } from "react";
import { getCookie } from "@src/utils/cookies";
import { useForm } from "react-hook-form";
import ChartType from "../chart";
import DateFilter from "../date-filter";
import Loader from "../loader";

export default function AnalyticsCard(props) {
    const { text, loading, type } = props;
    const date = new Date();
    const iso_date_format = date.toISOString().split("T")[0];
    const user_id = getCookie("user_id");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const [payload, setPayload] = useState({
        user_id: user_id,
        date: iso_date_format,
        parameter: 'v_r',
    });

    // const [chartData, setChartData] = useState({
    //     labels: Array.from({length: 24}, (_, i) => (i + 1).toString()),
    //     datasets: [
    //         {
    //             label: "Data",
    //             data: Array.from({length: 24}, (_, i) => (0)),
    //         },
    //     ],
    // });

    let additionalInputs;

    switch (type) {
        case "bar":
            additionalInputs = ["date", "parameter_select1"];
            break;
        case "line":
            additionalInputs = ["date", "parameter_select1"];
            break;
        case "comparison":
            additionalInputs = ["date", "parameter_select1", "parameter_select2"];
            break;
        case "histogram":
            additionalInputs = ["date", "parameter_select1", "parameter_select2"];
            break;
        case "radar":
            additionalInputs = ["date", "parameter_select1", "parameter_select2"];
            break;
        case "sum":
            additionalInputs = ["date", "parameter_select1", "parameter_select2"];
            break;
        case "2d":
            additionalInputs = ["date", "parameter_select1", "parameter_select2"];
            break;
    }

    const inputProps = {
        parameter_select1: {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1",
                ...register("parameter", { required: false }),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter", val);
                clearErrors("parameter");
            },
            err:
                errors.parameter &&
                errors.parameter.type == "required" &&
                "Required*",
        },
        parameter_select2: {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1",
                ...register("parameter2", { required: false }),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter2", val);
                clearErrors("parameter2");
            },
            err:
                errors.parameter2 &&
                errors.parameter2.type == "required" &&
                "Required*",
        },
        date: 
        {
            label: "Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
                ...register("date", {required: false}),
            },
            err: errors.date && (
                errors.date.type == "required" && "Please enter a Date"
            )
        },
    };

    const _additionalInputs = additionalInputs.map((item, key) => {
        return inputProps[item];
    });

    const onSubmitForm = (data) => {
        data['user_id'] = user_id
        setPayload(data)
    };

    if (loading) {
        return <Loader />;
    }

    const hourly_report = user.hourlyReport.all(payload);

    return (
        <div className="border-4 p-4 rounded-md">
            <div className="flex">
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    autoComplete="off"
                ></form>
                <DateFilter
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    additionalInputs={_additionalInputs}
                    onSubmitForm={onSubmitForm}
                />
            </div>
            {!!hourly_report ? (
                <ChartType chartData={hourly_report.data} type={type} />
            ) : (
                <Loader />
            )}
        </div>
    );
}
