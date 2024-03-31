import { user } from "@src/api";
import Loader from "@src/components/loader";
import Header from "@src/components/header";
import { getCookie } from "@src/utils/cookies";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FaultsTable from "./partials/faults-table";
import DateFilter from "@src/components/date-filter";
import { useForm } from "react-hook-form";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

export default function Reports() {
    const date = new Date();
    const iso_date_format = date.toISOString().split("T")[0];
    const user_id = getCookie("user_id");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [payload, setPayload] = useState({
        user_id: user_id,
        start_date: iso_date_format,
        end_date: iso_date_format,
    });

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push(`/login?target=${router.asPath}`);
        }
    }, []);

    const onSubmitForm = (data) => {
        data.start_date = dayjs(data.start_date).format('YYYY-MM-DD')
        data.end_date = dayjs(data.end_date).format('YYYY-MM-DD')
        setPayload(data);
    };

    const faults = user.faults.all(payload);
    
    const additionalInputs = [
        <Form.Item label={`Start date`} name={`start_date`}>
            <DatePicker className={``} format={`YYYY-MM-DD`} defaultValue={dayjs()}/>
        </Form.Item>,
        <Form.Item label={`End date`} name={`end_date`}>
            <DatePicker className={``} format={`YYYY-MM-DD`} defaultValue={dayjs()}/>
        </Form.Item>
    ]
    return (
        <>
            <Header activeNavItem="faults" />
            <div className="p-5">
                <form onSubmit={handleSubmit(onSubmitForm)}></form>
                <DateFilter
                    handleSubmit={onSubmitForm}
                    additionalInputs={additionalInputs}
                />
                {!!faults ? (
                    <FaultsTable faults={faults.data} />
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}
