import Input from "@components/input"
import { user } from "@src/api"
import Button from "@src/components/button"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function Signup(){

    const {register, handleSubmit, formState:{errors}} = useForm()
    
    const inputs = [
        {
            isHalfWidth: true,
            label: "First name",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "john",
                form: "signup-form",
                ...register("first_name", {required: true}),
            },
            err: errors.first_name && (
                errors.first_name.type == "required" && "please enter first name"
            )
        },
        {
            isHalfWidth: true,
            label: "Last name",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "doe",
                form: "signup-form",
                ...register("last_name", {required: true}),
            },
            err: errors.last_name && (
                errors.last_name.type == "required" && "please enter last name"
            )
        },
        {
            label: "Email address",
            leftIcon: "email-outline-primary",
            attrs: {
                placeholder: "johndoe or john@gmail.com",
                form: "signup-form",
                ...register("email", {required: true}),
            },
            err: errors.email && (
                errors.email.type == "required" && "please enter email"
            )
        },
        {
            label: "Contact no.",
            leftIcon: "phone-primary",
            attrs: {
                placeholder: "91234 56780",
                form: "signup-form",
                ...register("contact_no", {required: true, maxLength: 10, minLength: 10}),
            },
            err: errors.contact_no && (
                errors.contact_no.type == "required" && "please enter password"
                || (errors.contact_no.type == "minLength" || errors.contact_no.type == "maxLength") && "please more than 8 characters are required"
            )
        },
        {
            isHalfWidth: true,
            label: "Username",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "johndoe",
                form: "signup-form",
                ...register("username", {required: true}),
            },
            err: errors.username && (
                errors.username.type == "required" && "please enter username"
            )
        },
        {
            isHalfWidth: true,
            label: "Password",
            leftIcon: "lock-outline-primary",
            attrs: {
                placeholder: "********",
                form: "signup-form",
                type: "password",
                ...register("password", {required: true, minLength: 8}),
            },
            err: errors.password && (
                errors.password.type == "required" && "please enter password"
                || errors.password.type == "minLength" && "please type more than 8 characters"
            )
        },
    ]

    const signup = (e) => {
        let username = e.username
        let password = e.password
    }
    return (
        <div className="popup">
            <div className="flex items-center">
                <p className="text-primary text-lg font-semibold mr-5">welcome</p>
                <Image src="/images/icons/celebration-primary.svg" width={24} height={24}/>
            </div>
            <div className="mt-5">
                <h2 className="text-2xl font-semibold text-primary">Create your brand new account</h2>
            </div>

            {/* Input divs */}
            <form id="signup-form" onSubmit={handleSubmit(signup)} autoComplete="off"></form>
            <div className="mt-7 grid grid-cols-2 gap-x-4">
                {
                    inputs.map((item, key) => {
                        return (
                            <div key={key} className={`mb-4 ${item.isHalfWidth ? "col-span-2 md:col-span-1" : "col-span-2"}`}>
                                <Input {...item}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-4">
                <Button text="Signup" variant="primary" attrs={{form: "signup-form", type: "submit"}}/>
            </div>
            <div className="mt-7">
                <Link href="/login">
                    <a>
                        <Button text="Already have account" variant="text"/>
                    </a>
                </Link>
            </div>
        </div>
    )
}