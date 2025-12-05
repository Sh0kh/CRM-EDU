import React, { useState, useRef, useEffect } from "react";
import { LogOut, User, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function TeacherHeader({ active, sidebarOpen, ...props }) {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`fixed top-[10px] z-30 flex justify-between items-center mb-6 px-6 py-2 rounded-2xl border shadow-lg bg-white transition-all duration-500`}
            style={{
                width: sidebarOpen ? "calc(99% - 245px)" : "calc(99% - 90px)",
                left: sidebarOpen ? "245px" : "90px",
            }}
        >
            {/* Левая часть — кнопка меню */}
            <div className="flex items-center gap-[20px] ">
                <Button
                    onClick={active}
                    className="px-[12px] py-[8px] rounded-xl bg-black hover:bg-gray-900 text-white transition-all duration-300 hidden md:inline-flex"
                >
                    <Menu className="w-5 h-5" />
                </Button>


            </div>

            {/* Правая часть — только профиль */}
            <div className="flex items-center gap-4">
                <div className="relative flex items-center gap-4" ref={menuRef}>
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="flex items-center gap-3 px-4 py-1 rounded-xl border shadow text-sm font-medium bg-white hover:bg-gray-100 text-gray-800 transition-all duration-300"
                    >
                        <div className="p-2 rounded-full bg-gray-200">
                            <User className="w-4 h-4" />
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${openMenu ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {openMenu && (
                        <div className="absolute right-0 top-16 w-48 bg-white border shadow-xl rounded-xl py-2 z-50 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                            <div className="h-px my-1 bg-gray-200"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Chiqish</span>
                            </button>
                        </div>
                    )}

                    {props.children}
                </div>
            </div>
        </div>
    );
}
