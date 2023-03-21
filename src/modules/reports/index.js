import { user } from "@src/api";
import Loader from "@src/components/loader";
import Header from "@src/components/header";
import { getCookie } from "@src/utils/cookies";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReportsTable from "./partials/reports-table";
import DateFilter from "@src/components/date-filter";
import { useForm } from "react-hook-form";

export default function Reports() {
    const date = new Date();
    const iso_date_format = date.toISOString().split("T")[0];
    const user_id = getCookie("user_id");
    const devices = getCookie("devices") ? JSON.parse(getCookie("devices")) : [];
    const router = useRouter();
    const start_date={iso_date_format}
    const end_date={iso_date_format}

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [payload, setPayload] = useState({
        device_id: 1,
        user_id: user_id,
        start_date: iso_date_format,
        end_date: iso_date_format,
    });

    useEffect(() => {
        console.log(getCookie("devices"))
        if (!isUserLoggedIn()) {
            router.push(`/login?target=${router.asPath}`);
        }
    }, []);

    const reports = user.reports.all(payload);
    const _additionalInputs = [
        {
            label: "Select device",
            attrs: {
                placeholder: "Select device",
                ...register("device_id", { required: false }),
            },
            options: devices,
            onSelect: (val) => {
                setValue("device_id", val.value);
                clearErrors("device_id");
            },
            err:
                errors.device_id &&
                errors.device_id.type == "required" &&
                "Required*",
        },
        {
            label: "Start Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
                ...register("start_date", {
                    required: true,
                    value: start_date,
                }),
            },
            err:
                errors.start_date &&
                errors.start_date.type == "required" &&
                "Please enter a Start Date",
        },
        {
            label: "End Date",
            leftIcon: "account-circle-primary",
            attrs: {
                type: "date",
                ...register("end_date", { required: true, value: end_date }),
            },
            err:
                errors.end_date &&
                errors.end_date.type == "required" &&
                "Please enter a End Date",
        },
    ];

    const onSubmitForm = (data) => {
        data["user_id"] = user_id;
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
                            handleSubmit={handleSubmit}
                            onSubmitForm={onSubmitForm}
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
