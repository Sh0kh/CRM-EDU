import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
    Select,
    Option,
} from "@material-tailwind/react";

import { Employee } from "../../../../utils/Controllers/Employee";
import { Alert } from "../../../../utils/Alert";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import Edit from "../../../Other/UI/Icons/Edit";

export default function Put({ employee, refresh }) {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    // Prefill data
    const [form, setForm] = useState({
        school_id: Number(id),
        full_name: employee?.full_name || "",
        phone_number: employee?.phone_number || "+998",
        login: employee?.login || "",
        role: employee?.role || "administrator",
        salary: employee?.salary || "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const EditEmployee = async () => {
        try {
            setLoading(true);

            const dataToSend = {
                ...form,
                phone_number: `+${form.phone_number.replace(/\D/g, "")}`,
                id: employee.id, // обязательно
            };

            await Employee.Edit(id, dataToSend);

            Alert("O'zgartirildi!", "success");
            setLoading(false);
            handleOpen();
            refresh();
        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert("Xato!", "error");
        }
    };

    return (
        <>
            {/* Edit Button */}
            <Button
                onClick={handleOpen}
                className="bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 normal-case p-[8px]"
            >
                <Edit size={18} />
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen} className="p-2" size="">
                <DialogHeader>Xodimni o‘zgartirish</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    <Input
                        label="Ism familiya"
                        value={form.full_name}
                        onChange={(e) => handleChange("full_name", e.target.value)}
                    />

                    <Input
                        label="Telefon"
                        value={form.phone_number}
                        onChange={(e) => handleChange("phone_number", e.target.value)}
                    />

                    <Input
                        label="Login"
                        value={form.login}
                        onChange={(e) => handleChange("login", e.target.value)}
                    />

                    <Select
                        label="Rol"
                        value={form.role}
                        onChange={(value) => handleChange("role", value)}
                    >
                        <Option value="administrator">Administrator</Option>
                        <Option value="teacher">Teacher</Option>
                    </Select>

                    <Input
                        label="Oylik (salary)"
                        type="number"
                        value={form.salary}
                        onChange={(e) => handleChange("salary", e.target.value)}
                    />

                </DialogBody>

                <DialogFooter className="flex gap-2">
                    <Button variant="text" onClick={handleOpen}>
                        Bekor qilish
                    </Button>

                    <Button
                        color="blue"
                        onClick={EditEmployee}
                        disabled={loading}
                    >
                        {loading ? "Yuklanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
