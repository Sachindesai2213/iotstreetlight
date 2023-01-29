import { user } from "@src/api";
import { METER_PARAMETERS } from "@src/utils/globals";
import { useState } from "react";
import { getCookie } from "@src/utils/cookies";
import { useForm } from "react-hook-form";
import ChartType from "../chart";
import DateFilter from "../date-filter";
import Loader from "../loader";
import { Tabs } from "flowbite-react";
import Icon from "../icon";
import Input from "../input";

export default function AnalyticsCard(props) {
    const { text, loading, type, index, onRemoveGraph } = props;
    const date = new Date();
    const iso_date_format = date.toISOString().split("T")[0];
    const user_id = getCookie("user_id");

    let graph_type = "avg";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const [hourlyPayload, setHourlyPayload] = useState({
        user_id: user_id,
        date: iso_date_format,
        parameter_1: "v_r",
        parameter_2: "",
        type: "avg",
    });

    const [dailyPayload, setDailyPayload] = useState({
        user_id: user_id,
        month: iso_date_format.slice(0, 7),
        parameter_1: "v_r",
        parameter_2: "",
        type: "avg",
    });

    const [monthlyPayload, setMonthlyPayload] = useState({
        user_id: user_id,
        year: iso_date_format.slice(0, 4),
        parameter_1: "v_r",
        parameter_2: "",
        type: "avg",
    });

    let additionalHourlyInputs;
    let additionalDailyInputs;
    let additionalMonthlyInputs;

    switch (type) {
        case "bar":
            additionalHourlyInputs = ["date", "parameter_select1"];
            additionalDailyInputs = ["month", "parameter_select1"];
            additionalMonthlyInputs = ["year", "parameter_select1"];
            break;
        case "line":
            additionalHourlyInputs = ["date", "parameter_select1"];
            additionalDailyInputs = ["month", "parameter_select1"];
            additionalMonthlyInputs = ["year", "parameter_select1"];
            break;
        case "comparison":
            additionalHourlyInputs = [
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "histogram":
            additionalHourlyInputs = [
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "radar":
            additionalHourlyInputs = [
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "sum":
            additionalHourlyInputs = ["date", "parameter_select1"];
            additionalDailyInputs = ["month", "parameter_select1"];
            additionalMonthlyInputs = ["year", "parameter_select1"];
            graph_type = "sum";
            break;
        case "2d":
            additionalHourlyInputs = [
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
    }

    const inputProps = {
        parameter_select1: {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter1",
                ...register("parameter_1", { required: false }),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter_1", val);
                clearErrors("parameter_1");
            },
            err:
                errors.parameter_1 &&
                errors.parameter_1.type == "required" &&
                "Required*",
        },
        parameter_select2: {
            label: "Select parameter",
            attrs: {
                placeholder: "Select parameter2",
                ...register("parameter_2", { required: false }),
            },
            options: METER_PARAMETERS,
            onSelect: (val) => {
                setValue("parameter_2", val);
                clearErrors("parameter_2");
            },
            err:
                errors.parameter_2 &&
                errors.parameter_2.type == "required" &&
                "Required*",
        },
        date: {
            label: "Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
                ...register("date", {
                    value: iso_date_format,
                    required: false,
                }),
            },
            err:
                errors.date &&
                errors.date.type == "required" &&
                "Please enter a Date",
        },
        month: {
            label: "Month",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "month",
                pattern: "[0-9]{4}-[0-9]{2}",
                ...register("month", {
                    value: iso_date_format.slice(0, 7),
                    required: false,
                }),
            },
            err:
                errors.month &&
                errors.month.type == "required" &&
                "Please enter a Month",
        },
        year: {
            label: "Year",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "year",
                pattern: "[0-9]{4}",
                ...register("year", {
                    value: iso_date_format.slice(0, 4),
                    required: false,
                }),
            },
            err:
                errors.year &&
                errors.year.type == "required" &&
                "Please enter a Year",
        },
    };

    const _additionalHourlyInputs = additionalHourlyInputs.map((item, key) => {
        return inputProps[item];
    });

    const _additionalDailyInputs = additionalDailyInputs.map((item, key) => {
        return inputProps[item];
    });

    const _additionalMonthlyInputs = additionalMonthlyInputs.map(
        (item, key) => {
            return inputProps[item];
        }
    );

    const onHourlySubmitForm = (data) => {
        data["user_id"] = user_id;
        data["type"] = graph_type;
        data["parameter_2"] =
            "parameter_2" in data && data["parameter_2"]
                ? data["parameter_2"]
                : "";
        setHourlyPayload(data);
    };

    const onDailySubmitForm = (data) => {
        data["user_id"] = user_id;
        data["type"] = graph_type;
        data["parameter_2"] =
            "parameter_2" in data && data["parameter_2"]
                ? data["parameter_2"]
                : "";
        setDailyPayload(data);
    };

    const onMonthlySubmitForm = (data) => {
        data["user_id"] = user_id;
        data["type"] = graph_type;
        data["parameter_2"] =
            "parameter_2" in data && data["parameter_2"]
                ? data["parameter_2"]
                : "";
        setMonthlyPayload(data);
    };

    if (loading) {
        return <Loader />;
    }

    const deviceSelect = {
        label: "Select device",
        attrs: {
            placeholder: "Select device",
            ...register("device", { required: false }),
        },
        options: METER_PARAMETERS,
        onSelect: (val) => {
            setValue("device", val);
            clearErrors("device");
        },
        err:
            errors.device &&
            errors.device.type == "required" &&
            "Required*",
    }

    const hourly_report = user.hourlyReport.all(hourlyPayload);
    const daily_report = user.dailyReport.all(dailyPayload);
    const monthly_report = user.monthlyReport.all(monthlyPayload);

    return (
        <div className="border-4 p-4 rounded-md">
            <div className="flex items-center justify-between">
                <p className="capitalize text-sm font-bold text-primary">{type} graph</p>
                <div onClick={() => onRemoveGraph(index)} className="cursor-pointer">
                    <Icon icon="close"/>
                </div>
            </div>
            <Tabs.Group aria-label="Analytics" style="underline">
                <Tabs.Item active={true} title="Hourly">
                    <div className="flex">
                        <form
                            onSubmit={handleSubmit(onHourlySubmitForm)}
                            autoComplete="off"
                        ></form>
                        <div className="mt-2 mr-4">
                            <Input {...deviceSelect}/>
                        </div>
                        <DateFilter
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            additionalInputs={_additionalHourlyInputs}
                            onSubmitForm={onHourlySubmitForm}
                        />
                    </div>
                    {!!hourly_report ? (
                        <ChartType chartData={hourly_report.data} type={type} />
                    ) : (
                        <Loader />
                    )}
                </Tabs.Item>
                <Tabs.Item title="Daily">
                    <div className="flex">
                        <form
                            onSubmit={handleSubmit(onDailySubmitForm)}
                            autoComplete="off"
                        ></form>
                        <DateFilter
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            additionalInputs={_additionalDailyInputs}
                            onSubmitForm={onDailySubmitForm}
                        />
                    </div>
                    {!!daily_report ? (
                        <ChartType chartData={daily_report.data} type={type} />
                    ) : (
                        <Loader />
                    )}
                </Tabs.Item>
                <Tabs.Item title="Monthly">
                    <div className="flex">
                        <form
                            onSubmit={handleSubmit(onMonthlySubmitForm)}
                            autoComplete="off"
                        ></form>
                        <DateFilter
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            additionalInputs={_additionalMonthlyInputs}
                            onSubmitForm={onMonthlySubmitForm}
                        />
                    </div>
                    {!!monthly_report ? (
                        <ChartType
                            chartData={monthly_report.data}
                            type={type}
                        />
                    ) : (
                        <Loader />
                    )}
                </Tabs.Item>
            </Tabs.Group>
        </div>
    );
}
