import Link from "next/link";
import Button from "../button";
import Icon from "../icon";
import Logo from "../logo";
import Nav from "./partials/nav";
import Input from "../input";
import { useForm } from "react-hook-form";
import { getCookie, setCookie } from "@src/utils/cookies";

export default function Header(props) {
    const { activeNavItem } = props;

    const group = getCookie("group");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const GROUPS = [
        {name: 'Bandra', value: 'Bandra'},
        {name: 'Andheri', value: 'Andheri'},
    ]

    const group_select = {
        attrs: {
            placeholder: "Select Group",
            ...register("group", { required: false }),
            defaultValue: group
        },
        options: GROUPS,
        onSelect: (val) => {
            setValue("group", val);
            clearErrors("group");
            setCookie("group", val)
        },
        err:
            errors.group &&
            errors.group.type == "required" &&
            "Required*",
    };

    return (
        <div className="flex items-center justify-center bg-white shadow-md relative z-10">
            <div className="w-full xl:container h-16 grid grid-cols-12 px-5 gap-x-4">
                <div className="col-span-6 md:col-span-3 flex items-center">
                    <Button
                        icon="menu"
                        isIconButton
                        additionalClasses="md:hidden mr-4"
                    />
                    <Logo />
                </div>
                <div className="hidden md:flex col-span-6 items-center justify-center">
                    <Nav active={activeNavItem} />
                </div>
                <div className="col-span-6 md:col-span-3 flex items-center justify-end">
                    <div className="mr-2">
                        <Input {...group_select} />
                    </div>
                    <Link href="/profile">
                        <a>
                            <button className="w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
                                {/* <Icon icon="account-primary"/> */}
                                <p className="text-base text-primary font-medium">
                                    S
                                </p>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
