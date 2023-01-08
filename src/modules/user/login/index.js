import Input from "@components/input";
import { user } from "@src/api";
import Button from "@src/components/button";
import { login_user } from "@src/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const router = useRouter();

    const inputs = [
        {
            label: "Email address",
            leftIcon: "account-circle-primary",
            attrs: {
                placeholder: "johndoe or john@gmail.com",
                form: "login-form",
                ...register("username", { required: true }),
            },
            err:
                errors.username &&
                errors.username.type == "required" &&
                "please enter username or email",
        },
        {
            label: "Password",
            leftIcon: "lock-outline-primary",
            attrs: {
                placeholder: "********",
                form: "login-form",
                type: "password",
                ...register("password", { required: true, minLength: 2 }),
            },
            err:
                errors.password &&
                ((errors.password.type == "required" &&
                    "please enter password") ||
                    (errors.password.type == "minLength" &&
                        "please more than 8 characters are required")),
        },
    ];

    const login = async (data) => {
        setLoading(true);
        setErr(null);
        const response = await user.login(data);
        if (response.flash) {
            login_user(response.data);
            router.push("/meters");
        } else {
            setErr(response.message);
        }
        setLoading(false);
    };
    return (
        <div className="popup">
            <div className="flex items-center">
                <p className="text-primary text-lg font-semibold mr-5">
                    welcome back
                </p>
                <Image
                    src="/images/icons/celebration-primary.svg"
                    width={24}
                    height={24}
                />
            </div>
            <div className="mt-5">
                <h2 className="text-2xl font-semibold text-primary">
                    Login to your account
                </h2>
            </div>

            {/* Input divs */}
            <form
                id="login-form"
                onSubmit={handleSubmit(login)}
                autoComplete="off"
            ></form>
            <div className="mt-7">
                {inputs.map((item, key) => {
                    return (
                        <div key={key} className="mb-7">
                            <Input {...item} />
                        </div>
                    );
                })}
            </div>
            {err && <p className="error mb-7">{err}</p>}
            <div>
                <Button
                    text="Login"
                    variant="primary"
                    attrs={{ form: "login-form", type: "submit" }}
                    loading={loading}
                />
            </div>
            <div className="mt-7">
                <Link href="/signup">
                    <a>
                        <Button text="dont have account" variant="text" />
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Login;
