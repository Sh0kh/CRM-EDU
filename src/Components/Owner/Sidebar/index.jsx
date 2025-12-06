import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

export default function Sidebar({ open }) {
    const [role] = useState("admin");
    const location = useLocation();

    const [isMobile, setIsMobile] = useState(false);

    // Проверяем ширину экрана при монтировании и при изменении размера
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 700);
        };

        // Проверяем сразу при загрузке
        checkMobile();

        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', checkMobile);

        // Очистка слушателя при размонтировании
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Функция для получения фактического состояния sidebar
    // Если ширина экрана меньше 700px И open активно, sidebar маленький
    const getActualOpenState = () => {
        if (isMobile && open) {
            return true; // маленький sidebar
        }
        return open;
    };

    const groupedMenuItems = [
        {
            section: "Asosiy",
            items: [
                {
                    id: 2,
                    title: "Markaz",
                    path: "/owner/center",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M14 21v-3a2 2 0 0 0-4 0v3m8-16v16M4 6l7.106-3.79a2 2 0 0 1 1.788 0L20 6"></path><path d="m6 11l-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11M6 5v16"></path><circle cx={12} cy={9} r={2}></circle></g></svg>
                    ),
                },
            ],
        },
    ];

    const actualOpen = getActualOpenState();


    return (
        <Card
            className={`h-[95%]   fixed top-[15px] left-[15px] z-50 shadow-xl bg-white/30 backdrop-blur-md border border-white/20 px-4 py-6 overflow-y-auto transition-all duration-500
        ${actualOpen ? "w-[70px]" : "w-[220px]"}`}
        >
            <div className="flex items-center justify-center mb-6">
            </div>
            <div className="flex flex-col gap-6">
                {groupedMenuItems.map((group) => (
                    <div key={group.section}>
                        {!open && (
                            <Typography
                                variant="small"
                                color="gray"
                                className="mb-2 uppercase font-medium text-xs tracking-widest"
                            >
                                {group.section}
                            </Typography>
                        )}
                        <div className="flex flex-col gap-2">
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center ${open && 'justify-center'} gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300
                      ${isActive
                                            ? "bg-white/80 text-[#4DA057] font-semibold shadow-md"
                                            : "text-gray-700 hover:bg-white/40 hover:text-[#0A9EB3]"
                                        }`
                                    }
                                >
                                    <span className="w-6 h-6">{item.icon}</span>
                                    {!open && <span className="text-sm">{item.title}</span>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
