import { user } from "@src/api";
import { METER_PARAMETERS } from "@src/utils/globals";
import { useEffect, useState } from "react";
import { getCookie } from "@src/utils/cookies";
import { useForm } from "react-hook-form";
import ChartType from "../chart";
import DateFilter from "../date-filter";
import Loader from "../loader";
import { Tabs } from "flowbite-react";
import Icon from "../icon";
import { DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";

export default function AnalyticsCard(props) {
    const [hourlyForm] = Form.useForm()
    const [dailyForm] = Form.useForm()
    const [monthlyForm] = Form.useForm()
    const { text, loading, type, index, onRemoveGraph } = props;
    const rawDevices = user.devices.all()
    const devices = rawDevices?.data
    const device = devices ? devices[0] : undefined
    const device_id = device ? device.id : 1
    const [deviceParameters, setDeviceParameters] = useState(device ? device.device_parameters : [])

    let graph_type = "avg";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const [hourlyPayload, setHourlyPayload] = useState({
        device_id,
        date: dayjs().format(`YYYY-MM-DD`),
        parameter_1: "",
        parameter_2: "",
        type: "avg",
        interval: "hourly",
    });

    const [dailyPayload, setDailyPayload] = useState({
        device_id,
        month: dayjs().format(`YYYY-MM`),
        parameter_1: "",
        parameter_2: "",
        type: "avg",
        interval: "daily",
    });

    const [monthlyPayload, setMonthlyPayload] = useState({
        device_id,
        year: dayjs().format(`YYYY`),
        parameter_1: "",
        parameter_2: "",
        type: "avg",
        interval: "monthly",
    });

    useEffect(() => {
        let parameter_1 = device && device.device_parameters ? device.device_parameters[0].key : ''
        let parameter_2 = parameter_1
        setHourlyPayload({
            device_id,
            date: dayjs().format(`YYYY-MM-DD`),
            parameter_1,
            parameter_2,
            type: "avg",
            interval: "hourly",
        })
        setDailyPayload({
            device_id,
            month: dayjs().format(`YYYY-MM`),
            parameter_1,
            parameter_2,
            type: "avg",
            interval: "daily",
        })
        setMonthlyPayload({
            device_id,
            year: dayjs().format(`YYYY`),
            parameter_1,
            parameter_2,
            type: "avg",
            interval: "monthly",
        })
        hourlyForm.setFieldsValue({
            device_id,
            parameter_1,
            parameter_2
        })
        dailyForm.setFieldsValue({
            device_id,
            parameter_1,
            parameter_2
        })
        monthlyForm.setFieldsValue({
            device_id,
            parameter_1,
            parameter_2
        })
    }, [device])

    let additionalHourlyInputs;
    let additionalDailyInputs;
    let additionalMonthlyInputs;

    switch (type) {
        case "bar":
            additionalHourlyInputs = ["device", "date", "parameter_select1"];
            additionalDailyInputs = ["device", "month", "parameter_select1"];
            additionalMonthlyInputs = ["device", "year", "parameter_select1"];
            break;
        case "line":
            additionalHourlyInputs = ["device", "date", "parameter_select1"];
            additionalDailyInputs = ["device", "month", "parameter_select1"];
            additionalMonthlyInputs = ["device", "year", "parameter_select1"];
            break;
        case "comparison":
            additionalHourlyInputs = [
                "device",
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "device",
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "device",
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "histogram":
            additionalHourlyInputs = [
                "device",
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "device",
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "device",
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "radar":
            additionalHourlyInputs = [
                "device",
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "device",
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "device",
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
        case "sum":
            additionalHourlyInputs = ["device", "date", "parameter_select1"];
            additionalDailyInputs = ["device", "month", "parameter_select1"];
            additionalMonthlyInputs = ["device", "year", "parameter_select1"];
            graph_type = "sum";
            break;
        case "2d":
            additionalHourlyInputs = [
                "device",
                "date",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalDailyInputs = [
                "device",
                "month",
                "parameter_select1",
                "parameter_select2",
            ];
            additionalMonthlyInputs = [
                "device",
                "year",
                "parameter_select1",
                "parameter_select2",
            ];
            break;
    }

    const formatParameters = (params) => {
        return params.map((item) => {
            return {
                value: item.key,
                label: item.name
            }
        })
    }

    const inputProps = {
        device: (
            <Form.Item className={``} name={`device_id`} label={`Select device`}>
                <Select
                    options={devices?.map((item) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}
                    onChange={(data) => {
                        console.log(data)
                        device = devices.find((device) => device.id == data)
                        setDeviceParameters(device ? formatParameters(device.device_parameters) : [])
                    }}
                />
            </Form.Item>
        ),
        parameter_select1: (
            <Form.Item className={``} name={`parameter_1`} label={`Select parameter 1`}>
                <Select
                    options={deviceParameters}
                />
            </Form.Item>
        ),
        parameter_select2: (
            <Form.Item className={``} name={`parameter_2`} label={`Select parameter 2`}>
                <Select
                    options={deviceParameters}
                />
            </Form.Item>
        ),
        date: (
            <Form.Item label={`Select date`} name={`date`}>
                <DatePicker className={``} format={`YYYY-MM-DD`} defaultValue={dayjs()}/>
            </Form.Item>
        ),
        month: (
            <Form.Item label={`Select date`} name={`date`}>
                <DatePicker className={``} format={`YYYY-MM`} picker={`month`} defaultValue={dayjs()}/>
            </Form.Item>
        ),
        year: (
            <Form.Item label={`Select date`} name={`date`}>
                <DatePicker className={``} format={`YYYY`} picker={`year`} defaultValue={dayjs()}/>
            </Form.Item>
        ),
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
        const date = data.date
        data.date = dayjs(date).format(`YYYY-MM-DD`)
        data["type"] = graph_type;
        data.interval = "hourly";
        setHourlyPayload(data);
    };

    const onDailySubmitForm = (data) => {
        data["type"] = graph_type;
        data.interval = "daily";
        setDailyPayload(data);
    };

    const onMonthlySubmitForm = (data) => {
        data["type"] = graph_type;
        data.interval = "monthly";
        setMonthlyPayload(data);
    };

    if (loading) {
        return <Loader />;
    }

    const hourly_report = user.intervalReport.all(hourlyPayload);
    const daily_report = user.intervalReport.all(dailyPayload);
    const monthly_report = user.intervalReport.all(monthlyPayload);

    return (
        <div className="border-4 p-4 rounded-md">
            <div className="flex items-center justify-between">
                <p className="capitalize text-sm font-bold text-primary">{type} graph</p>
                <div onClick={() => onRemoveGraph(index)} className="cursor-pointer">
                    <Icon icon="close"/>
                </div>
            </div>
            <Tabs.Group aria-label="Analytics" style="underline" key={index}>
                <Tabs.Item active={true} title="Hourly">
                    <div className="flex">
                        <DateFilter
                            handleSubmit={onHourlySubmitForm}
                            additionalInputs={_additionalHourlyInputs}
                            form={hourlyForm}
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
                        <DateFilter
                            handleSubmit={onDailySubmitForm}
                            additionalInputs={_additionalDailyInputs}
                            form={dailyForm}
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
                        <DateFilter
                            handleSubmit={onMonthlySubmitForm}
                            additionalInputs={_additionalMonthlyInputs}
                            form={monthlyForm}
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
