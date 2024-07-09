import { Outlet, Link } from "react-router-dom"
import { useState } from "react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <nav className="w-full h-[10vh] bg-black flex justify-between items-center relative overscroll-none">
                <Link to={"/"} className="w-20 h-20 object-cover p-2">
                    <img src="assets/fire_icon.png" alt="" />
                </Link>

                <img src="assets/icons8-menu.svg" onClick={toggleMenu} className="w-15 h-15 md:hidden mr-2 mix-blend-screen" alt="" />

            </nav>

            <Outlet />
        </>
    )
}

{/* <ul className="hidden md:flex justify-evenly gap-4 items-center w-1/3 h-full list-none text-2xl text-white pr-3 font-inter absolute">
                    <li className="hover:scale-110 hover:text-amber-400 hover:font-bold transition-colors duration-300">
                        <Link to={"/upload"}>Upload</Link>
                    </li>
                    <li className="hover:scale-110 hover:text-amber-400 hover:font-bold transition-colors duration-300">
                        <Link to={"/download"}>Download</Link>
                    </li>
                </ul> */}