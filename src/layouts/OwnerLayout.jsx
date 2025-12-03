import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminHeader from "../Components/Other/UI/Header/AdminHeader";
import Sidebar from "../Components/Owner/Sidebar";

export default function OwnerLayout() {
    const [active, setActive] = useState(false); // true = открыт сайдбар

    return (
        <div className="flex w-full overflow-hidden bg-[#FAFAFA] relative">
            <Sidebar open={active} onClose={() => setActive(false)} />
            <div
                className={`mt-[80px] pb-[30px] px-[15px] min-h-screen transition-all duration-300`}
                style={{
                    marginLeft: !active ? "230px" : "110px",
                    width: !active ? "calc(100% - 230px)" : "100%",
                }}
            >
                <AdminHeader active={() => setActive(!active)} sidebarOpen={!active} />
                <Outlet />
            </div>
        </div>
    );
}
