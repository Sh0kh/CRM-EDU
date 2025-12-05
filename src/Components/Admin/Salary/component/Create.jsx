import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Spinner,
} from "@material-tailwind/react";

import { Alert } from "../../../../utils/Alert";
import Cookies from "js-cookie";
import { SalaryApi } from "../../../../utils/Controllers/Salary";
import { Employee } from "../../../../utils/Controllers/Employee";
import { PaymentMethodApi } from "../../../../utils/Controllers/PaymentMethodApi";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [methods, setMethods] = useState([]);

    const months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr"
    ];

    const school_id = Number(Cookies.get("school_id"));
    const currentYear = new Date().getFullYear();

    const [data, setData] = useState({
        school_id,
        teacher_id: "",
        price: "",
        method: "",
        month: "",
        description: "",
        year: currentYear,
    });

    const handleOpen = () => setOpen(!open);

    const formatPrice = (value) => {
        // Удаляем всё, кроме цифр
        const number = value.replace(/\D/g, "");

        // Форматируем пробелами
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };


    const getTeachers = async () => {
        try {
            const res = await Employee.GetBySchoolId(school_id);
            setTeachers(res?.data || []);
        } catch (error) {
            console.log("Teacher fetch error:", error);
        }
    };

    const getMethods = async () => {
        try {
            const res = await PaymentMethodApi.Get(school_id);
            setMethods(res?.data || []);
        } catch (error) {
            console.log("Method fetch error:", error);
        }
    };

    useEffect(() => {
        if (open) {
            getTeachers();
            getMethods();
        }
    }, [open]);

    const CreateSalaryFunc = async () => {
        try {
            setLoading(true);

            const sendData = {
                school_id: data.school_id,
                teacher_id: Number(data.teacher_id),
                price: Number(data.price),
                method: data.method,
                month: data.month,
                description: data.description,
                year: String(data.year),
            };

            await SalaryApi.Create(sendData);

            Alert("Oylik to‘lov muvaffaqiyatli yaratildi!", "success");
            setOpen(false);
            setData({ ...data, teacher_id: "", price: "", method: "", month: "", description: "" });
            refresh();
        } catch (error) {
            console.log("Salary create error:", error);
            Alert(error?.response?.data?.message || "Xatolik yuz berdi!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button className="bg-black text-white" onClick={handleOpen}>
                + Oylik berish
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Oylik to‘lov yaratish</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    {/* Teacher Select */}
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                   focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        value={data.teacher_id}
                        onChange={(e) => setData({ ...data, teacher_id: e.target.value })}
                    >
                        <option value="">O‘qituvchi tanlang</option>
                        {teachers.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.full_name}
                            </option>
                        ))}
                    </select>

                    {/* Payment Method */}
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                   focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        value={data.method}
                        onChange={(e) => setData({ ...data, method: e.target.value })}
                    >
                        <option value="">To‘lov usuli</option>
                        {methods.map((m) => (
                            <option key={m.id} value={m.name}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    {/* Month */}
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                   focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        value={data.month}
                        onChange={(e) => setData({ ...data, month: e.target.value })}
                    >
                        <option value="">Oy tanlang</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>

                    {/* Price */}
                    <Input
                        type="text"
                        label="Narx"
                        value={formatPrice(data.price)}
                        onChange={(e) => {
                            const clean = e.target.value.replace(/\D/g, "");
                            setData({ ...data, price: clean });
                        }}
                    />

                    {/* Description */}
                    <Input
                        label="Izoh"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                </DialogBody>

                <DialogFooter className="flex gap-2">
                    <Button variant="text" color="gray" onClick={handleOpen} disabled={loading}>
                        Bekor qilish
                    </Button>
                    <Button
                        className="bg-black text-white flex items-center justify-center gap-2"
                        onClick={CreateSalaryFunc}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Spinner className="h-4 w-4" /> Yaratilmoqda...
                            </div>
                        ) : (
                            "Yaratish"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
