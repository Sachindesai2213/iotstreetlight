import Input from "@src/components/input"
import { useForm } from "react-hook-form"

export default function AddMeter(){

    const {register, handleSubmit, formState:{errors}} = useForm()

    const inputs = [
        {
            label: "Meter name",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "Transformer",
                form: "add-meter-form",
                ...register("meter_name", {required: true}),
            },
            err: errors.meter_name && (
                errors.meter_name.type == "required" && "please enter meter name"
            )
        },
        {
            isHalfWidth: true,
            label: "Poles at R",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "0",
                type: "number",
                form: "add-meter-form",
                ...register("poles_at_r", {required: true}),
            },
            err: errors.poles_at_r && (
                errors.poles_at_r.type == "required" && "please enter number of poles at r"
            )
        },
        {
            isHalfWidth: true,
            label: "Poles at Y",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "0",
                type: "number",
                form: "add-meter-form",
                ...register("poles_at_y", {required: true}),
            },
            err: errors.poles_at_y && (
                errors.poles_at_y.type == "required" && "please enter number of poles at y"
            )
        },
        {
            isHalfWidth: true,
            label: "Poles at B",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "0",
                type: "number",
                form: "add-meter-form",
                ...register("poles_at_b", {required: true}),
            },
            err: errors.poles_at_b && (
                errors.poles_at_b.type == "required" && "please enter number of poles at b"
            )
        },
        {
            label: "Group name",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "Bandra poles",
                form: "add-meter-form",
                ...register("group_name", {required: true}),
            },
            err: errors.group_name && (
                errors.group_name.type == "required" && "please enter group name"
            )
        },
    ]

    const periodTypes = [
        {
            name: "Automatic",
            value: "automatic",
            attrs: {
                form: "add-meter-form"
            },
            onClick: () => alert("selected automatic")
        }
    ]

    return (
        <div className="popup">
            <form id="add-meter-form"></form>

            <div className="mt-7 grid grid-cols-3 gap-x-4">
                
                {/* Basic detials */}
                {
                    inputs.map((item, key) => {
                        return (
                            <div key={key} className={`mb-6 ${item.isHalfWidth ? "col-span-1" : "col-span-3"}`}>
                                <Input {...item}/>
                            </div>
                        )
                    })
                }

                {/* On/Off details */}

            </div>
        </div>
    )
}