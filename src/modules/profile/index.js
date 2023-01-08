import { user } from "@src/api";
import Loader from "@src/components/loader";
import Header from "@src/components/header";
import Input from "@src/components/input";
import { useForm } from "react-hook-form";
import { VALIDATE } from "@src/utils/validations";
import Button from "@src/components/button";
import { getCookie } from "@src/utils/cookies";

export default function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user_id = getCookie("user_id");

    const profile = user.profile.get(user_id);

    const INPUTS = [
        {
            label: "Username",
            attrs: {
                placeholder: "Enter username",
                ...register("username", {
                    required: true,
                    pattern: VALIDATE.text_number,
                }),
                defaultValue: profile?.data?.username,
            },
            err:
                errors.username &&
                ((errors.username.type == "required" &&
                    "Please enter username") ||
                    (errors.username.type == "pattern" &&
                        "Please enter valid username (only text and number)")),
        },
        {
            label: "Email",
            attrs: {
                placeholder: "Enter email",
                type: "email",
                ...register("email", {
                    required: true,
                    pattern: VALIDATE.email,
                }),
                defaultValue: profile?.data?.email,
            },
            err:
                errors.email &&
                ((errors.email.type == "required" && "Please enter email") ||
                    (errors.email.type == "pattern" &&
                        "Please enter valid email")),
        },
        {
            label: "First name",
            attrs: {
                placeholder: "Enter first name",
                ...register("first_name", {
                    required: true,
                    pattern: VALIDATE.text,
                }),
                defaultValue: profile?.data?.first_name,
            },
            err:
                errors.first_name &&
                ((errors.first_name.type == "required" &&
                    "Please enter first name") ||
                    (errors.first_name.type == "pattern" &&
                        "Please enter valid first name (only text)")),
        },
        {
            label: "Last name",
            attrs: {
                placeholder: "Enter last name",
                ...register("last_name", {
                    required: true,
                    pattern: VALIDATE.text,
                }),
                defaultValue: profile?.data?.last_name,
            },
            err:
                errors.last_name &&
                ((errors.last_name.type == "required" &&
                    "Please enter last name") ||
                    (errors.last_name.type == "pattern" &&
                        "Please enter valid last name (only text)")),
        },
        {
            label: "Mobile number",
            attrs: {
                placeholder: "Enter mobile number",
                type: "number",
                ...register("contact", {
                    required: true,
                    pattern: VALIDATE.mobile,
                    minLength: 10,
                    maxLength: 10,
                }),
                defaultValue: profile?.data?.contact_no,
            },
            err:
                errors.contact &&
                ((errors.contact.type == "required" &&
                    "Please enter mobile number") ||
                    (errors.contact.type == "pattern" &&
                        "Please enter valid mobile number") ||
                    (errors.contact.type == "minLength" &&
                        "Please enter 10 digit mobile number") ||
                    (errors.contact.type == "maxLength" &&
                        "Please enter 10 digit mobile number")),
        },
    ];

    const updateProfile = (data) => {
        data["user_id"] = user_id;
        user.profile.update(data);
    };

    return (
        <>
            <Header />
            <div className="md:flex py-10 px-5 relative">
                <div
                    className="absolute top-0 left-0 w-full h-52 z-[-1]"
                    style={{
                        backgroundImage:
                            "url('/images/profile-layout-header.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
                <div className="w-96">
                    <h1 className="text-[50px] font-bold text-white">
                        Hello, Sachin
                    </h1>
                </div>
                <form onSubmit={handleSubmit(updateProfile)}></form>
                <div className="flex-grow bg-white shadow-md rounded-xl p-5 md:ml-8">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {!!profile ? (
                            INPUTS.map((item, key) => {
                                return (
                                    <div>
                                        <Input {...item} key={key} />
                                    </div>
                                );
                            })
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <div>
                            <Button
                                attrs={{ onClick: handleSubmit(updateProfile) }}
                                variant="primary"
                                text="Update profile"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
