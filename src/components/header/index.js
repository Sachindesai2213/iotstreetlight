import Link from "next/link";
import Button from "../button";
import Icon from "../icon";
import Logo from "../logo";
import Nav from "./partials/nav";

export default function Header(props){
    const {activeNavItem} = props
    return (
        <div className="flex items-center justify-center bg-white shadow-md">
            <div className="w-full xl:container h-16 grid grid-cols-12 px-5 gap-x-4">
                <div className="col-span-6 md:col-span-3 flex items-center">
                    <Button icon="menu" isIconButton additionalClasses="md:hidden mr-4"/>
                    <Logo/>
                </div>
                <div className="hidden md:flex col-span-6 items-center justify-center">
                    <Nav active={activeNavItem}/>
                </div>
                <div className="col-span-6 md:col-span-3 flex items-center justify-end">
                    <Link href="/profile">
                        <a>
                            <button className="w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
                                {/* <Icon icon="account-primary"/> */}
                                <p className="text-base text-primary font-medium">S</p>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
  