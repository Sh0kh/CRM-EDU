import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Components/Teacher/Sidebar";
import TeacherHeader from "../Components/Teacher/TacherHeader";

export default function TeacherLayout() {
    const [active, setActive] = useState(true);

    return (
        <div className="flex w-full overflow-hidden bg-[#FAFAFA] relative">
            <Sidebar open={active} onClose={() => setActive(false)} />
            <div
                className={`mt-[80px] pb-[30px] px-[15px] min-h-screen transition-all duration-300`}
                style={{
                    marginLeft: !active ? "230px" : "80px",
                    width: !active ? "calc(100% - 230px)" : "100%",
                }}
            >
                <TeacherHeader active={() => setActive(!active)} sidebarOpen={!active} />
                <Outlet />
            </div>
        </div>
    );
}
