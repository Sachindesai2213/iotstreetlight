import Header from "@src/components/header";
import Input from "@src/components/input";
import { useForm } from "react-hook-form";
import { VALIDATE } from "@src/utils/validations"
import Button from "@src/components/button";

export default function Profile(){

    const {register, handleSubmit, formState: {errors}} = useForm()

    const INPUTS = [
        {
            label: "username",
            attrs: {
                placeholder: "Enter username",
                ...register("username", {required: true, pattern: VALIDATE.text_number})
            },
            err: errors.username && (
                errors.username.type == "required" && "Please enter username" ||
                errors.username.type == "pattern" && "Please enter valid username (only text and number)"
            )
        },
        {
            label: "Full name",
            attrs: {
                placeholder: "Enter full name",
                ...register("full_name", {required: true, pattern: VALIDATE.text})
            },
            err: errors.full_name && (
                errors.full_name.type == "required" && "Please enter full name" ||
                errors.full_name.type == "pattern" && "Please enter valid full name (only text)"
            )
        },
        {
            label: "Email",
            attrs: {
                placeholder: "Enter email",
                type: "email",
                ...register("email", {required: true, pattern: VALIDATE.email})
            },
            err: errors.email && (
                errors.email.type == "required" && "Please enter email" ||
                errors.email.type == "pattern" && "Please enter valid email"
            )
        },
        {
            label: "Mobile number",
            attrs: {
                placeholder: "Enter mobile number",
                type: "number",
                ...register("mobile_number", {required: true, pattern: VALIDATE.mobile, minLength: 10, maxLength: 10})
            },
            err: errors.mobile_number && (
                errors.mobile_number.type == "required" && "Please enter mobile number" ||
                errors.mobile_number.type == "pattern" && "Please enter valid mobile number" ||
                errors.mobile_number.type == "minLength" && "Please enter 10 digit mobile number" ||
                errors.mobile_number.type == "maxLength" && "Please enter 10 digit mobile number"
            )
        }
    ]

    const updateProfile = (data) => {
        console.log(data)
    }
    return (
        <>
            <Header/>
            <div className="md:flex py-10 px-5 relative">
                <div className="absolute top-0 left-0 w-full h-52 z-[-1]" style={{backgroundImage: "url('/images/profile-layout-header.jpg')", backgroundSize: "cover", backgroundPosition: "top", backgroundRepeat: "no-repeat"}}></div>
                <div className="w-96">
                    <h1 className="text-[50px] font-bold text-white">Hello, Sachin</h1>
                </div>
                <form onSubmit={handleSubmit(updateProfile)}></form>
                <div className="flex-grow bg-white shadow-md rounded-xl p-5 md:ml-8">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {
                            INPUTS.map((item, key) => {
                                return (
                                    <div>
                                        <Input {...item} key={key}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <div>
                            <Button attrs={{onClick: handleSubmit(updateProfile)}} variant="primary" text="Update profile"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}