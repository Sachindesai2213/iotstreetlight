import Link from "next/link";
import Button from "../button";
import Logo from "../logo";
import Nav from "./partials/nav";
import { getCookie, setCookie } from "@src/utils/cookies";
import { Form, Select } from "antd";
import { useEffect } from "react";
import { isUserLoggedIn } from "@src/utils/functions";

export default function Header(props) {
    const { activeNavItem } = props;

    const group = getCookie("group");

    const GROUPS = [
        { label: "Bandra", value: "Bandra" },
        { label: "Andheri", value: "Andheri" },
        { label: "Borivali", value: "Borivali" },
    ];

    const onChangeGroup = (group) => {
        setCookie("group", group);
    }

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
                        <Form.Item name={`group`} noStyle>
                            <Select placeholder={`Select group`} defaultValue={group} options={GROUPS} onChange={onChangeGroup}/>
                        </Form.Item>
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
