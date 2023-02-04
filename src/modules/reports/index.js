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
import Input from "@src/components/input";

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
        device_id: 1,
        user_id: user_id,
        start_date: iso_date_format,
        end_date: iso_date_format,
    });

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push(`/login?target=${router.asPath}`);
        }
    }, []);

    const reports = user.reports.all(payload);
    const deviceSelect = {
        label: "Select device",
        attrs: {
            placeholder: "Select device",
            ...register("device", { required: false }),
        },
        options: [],
        onSelect: (val) => {
            setValue("device", val);
            clearErrors("device");
        },
        err:
            errors.device &&
            errors.device.type == "required" &&
            "Required*",
    }

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
                    <div className="mt-2">
                        <Input {...deviceSelect}/>
                    </div>
                    <div className="col-span-3">
                        <DateFilter
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            onSubmitForm={onSubmitForm}
                            start_date={iso_date_format}
                            end_date={iso_date_format}
                        />
                    </div>
                </div>
                {!!reports ? (
                    <ReportsTable reports={reports.data.reports} parameters={reports.data.parameters}/>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}
