import Button from "../button";
import Input from "../input";

export default function DateFilter(props) {
    const {
        start_date,
        end_date,
        additionalInputs,
        register,
        errors,
        handleSubmit,
        onSubmitForm,
    } = props;

    const inputs = additionalInputs || [
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

    return (
        <div className="py-2">
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-end">
                {inputs.map((item, key) => {
                    return (
                        <div key={key}>
                            <Input {...item} />
                        </div>
                    );
                })}
                <Button
                    text="Filter"
                    variant="primary"
                    attrs={{
                        onClick: handleSubmit(onSubmitForm),
                        type: "submit",
                    }}
                />
            </div>
            <hr className="my-2" />
        </div>
    );
}
