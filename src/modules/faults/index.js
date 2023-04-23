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
        data["user_id"] = user_id;
        setPayload(data);
    };

    const faults = user.faults.all(payload);
    return (
        <>
            <Header activeNavItem="faults" />
            <div className="p-5">
                <form onSubmit={handleSubmit(onSubmitForm)}></form>
                <DateFilter
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmitForm={onSubmitForm}
                    start_date={iso_date_format}
                    end_date={iso_date_format}
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
