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
import EditIcon from "../../../Other/UI/Icons/Edit";
import { Alert } from "../../../../utils/Alert";
import { SalaryApi } from "../../../../utils/Controllers/Salary";
import { Employee } from "../../../../utils/Controllers/Employee";
import { PaymentMethodApi } from "../../../../utils/Controllers/PaymentMethodApi";
import Cookies from "js-cookie";

export default function Put({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [loading, setLoading] = useState(false);

    const [editData, setEditData] = useState({
        teacher_id: data?.teacher_id || "",
        price: String(data?.price || ""),
        method: data?.method || "",
        month: data?.month || "",
        description: data?.description || "",
    });

    const [teachers, setTeachers] = useState([]);
    const [methods, setMethods] = useState([]);

    const school_id = Number(Cookies.get("school_id"));

    const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];

    // ------- PRICE FORMATTER -------
    const formatPrice = (value) => {
        const number = String(value).replace(/\D/g, "");
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                try {
                    const teacherRes = await Employee.GetBySchoolId(school_id);
                    setTeachers(teacherRes?.data || []);

                    const methodRes = await PaymentMethodApi.Get(school_id);
                    setMethods(methodRes?.data || []);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        }
    }, [open, school_id]);

    const updateSalary = async () => {
        setLoading(true);
        try {
            const sendData = {
                ...editData,
                price: Number(editData.price.replace(/\D/g, "")),
                teacher_id: Number(editData.teacher_id),
            };

            await SalaryApi.Update({
                school_id: data.school_id,
                id: data.id,
                data: sendData,
            });

            Alert("Oylik muvaffaqiyatli tahrirlandi!", "success");
            setOpen(false);
            refresh();
        } catch (error) {
            Alert(error?.response?.data?.message || "Xatolik yuz berdi!", "error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 normal-case p-[8px]"
                onClick={handleOpen}
            >
                <EditIcon size={18} />
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Oylik tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    {/* O‘qituvchi */}
                    <select
                        className="border p-2 rounded-md"
                        value={editData.teacher_id}
                        onChange={(e) =>
                            setEditData({ ...editData, teacher_id: e.target.value })
                        }
                    >
                        <option value="">O‘qituvchini tanlang</option>
                        {teachers.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.full_name || t.name}
                            </option>
                        ))}
                    </select>

                    {/* Miqdor */}
                    <Input
                        type="text"
                        label="Miqdor (so‘m)"
                        value={formatPrice(editData.price)}
                        onChange={(e) => {
                            const clean = e.target.value.replace(/\D/g, "");
                            setEditData({ ...editData, price: clean });
                        }}
                    />

                    {/* To‘lov usuli */}
                    <select
                        className="border p-2 rounded-md"
                        value={editData.method}
                        onChange={(e) =>
                            setEditData({ ...editData, method: e.target.value })
                        }
                    >
                        <option value="">To‘lov usulini tanlang</option>
                        {methods.map((m) => (
                            <option key={m.id} value={m.name}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    {/* Oy */}
                    <select
                        className="border p-2 rounded-md"
                        value={editData.month}
                        onChange={(e) =>
                            setEditData({ ...editData, month: e.target.value })
                        }
                    >
                        <option value="">Oy tanlang</option>
                        {months.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>

                    {/* Izoh */}
                    <Input
                        label="Izoh"
                        value={editData.description}
                        onChange={(e) =>
                            setEditData({ ...editData, description: e.target.value })
                        }
                    />
                </DialogBody>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="text"
                        className="text-black"
                        onClick={handleOpen}
                        disabled={loading}
                    >
                        Bekor qilish
                    </Button>

                    <Button
                        className="bg-black flex items-center justify-center gap-2"
                        onClick={updateSalary}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Spinner className="h-4 w-4" /> Saqlanmoqda...
                            </div>
                        ) : (
                            "Saqlash"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
