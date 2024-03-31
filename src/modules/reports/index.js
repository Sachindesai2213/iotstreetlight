import { user } from "@src/api";
import Loader from "@src/components/loader";
import Header from "@src/components/header";
import { getCookie } from "@src/utils/cookies";
import { formatAntdDate, isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReportsTable from "./partials/reports-table";
import DateFilter from "@src/components/date-filter";
import { useForm } from "react-hook-form";
import { Button, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";

export default function Reports() {
    const [form] = Form.useForm()
    const rawDevices = user.devices.all()
    const devices = rawDevices?.data
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [payload, setPayload] = useState({
        device_id: null,
        start_date: dayjs().format('YYYY-MM-DD'),
        end_date: dayjs().format('YYYY-MM-DD'),
    });

    useEffect(() => {
        const temp = {
            ...payload,
            device_id: devices?.[0].id
        }
        setPayload(temp)
        form.setFieldsValue({device_id: devices?.[0].id})
    }, [devices])

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push(`/login?target=${router.asPath}`);
        }
    }, []);

    const reports = user.reports.all(payload);
    const _additionalInputs = [
        <Form.Item className={`w-60`} name={`device_id`} label={`Select device`}>
            <Select
                options={devices?.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })}
            />
        </Form.Item>,
        
        <Form.Item label={`Start date`} name={`start_date`}>
            <DatePicker className={`w-60`} format={`YYYY-MM-DD`} defaultValue={dayjs()}/>
        </Form.Item>,

        <Form.Item label={`End date`} name={`end_date`}>
            <DatePicker className={`w-60`} format={`YYYY-MM-DD`} defaultValue={dayjs()}/>
        </Form.Item>
    ];

    const onSubmitForm = (data) => {
        data.start_date = dayjs(data.start_date).format('YYYY-MM-DD')
        data.end_date = dayjs(data.end_date).format('YYYY-MM-DD')
        setPayload(data);
    };
    return (
        <>
            <Header activeNavItem="reports" />
            <div className="p-5">
                <form onSubmit={handleSubmit(onSubmitForm)}></form>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 relative z-10">
                        <DateFilter
                            register={register}
                            errors={errors}
                            additionalInputs={_additionalInputs}
                            handleSubmit={onSubmitForm}
                            onSubmitForm={onSubmitForm}
                            form={form}
                        />
                    </div>
                </div>
                {!!reports ? (
                    <ReportsTable
                        reports={reports.data.reports}
                        parameters={reports.data.parameters}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}
