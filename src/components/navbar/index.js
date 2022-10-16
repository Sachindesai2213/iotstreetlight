import Logo from "../logo";

export default function Navbar(){
    return (
        <nav className="container bg-white shadow-md h-16 grid grid-cols-12">
            <div className="col-span-3">
                <Logo/>
            </div>
            <div className="col-span-6"></div>
            <div className="col-span-3 flex items-center justify-end">
                
            </div>
        </nav>
    )
}
  