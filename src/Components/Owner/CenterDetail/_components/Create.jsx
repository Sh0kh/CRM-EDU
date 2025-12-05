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
import { useParams } from "react-router-dom";

export default function CreateAdminModal({ refresh }) {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const [form, setForm] = useState({
        school_id: Number(id),
        full_name: "",
        phone_number: "+998",
        login: "",
        password: "",
        role: "administrator",
        salary: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const CreateAdmin = async () => {
        try {
            setLoading(true);

            const dataToSend = {
                ...form,
                phone_number: `+${form.phone_number.replace(/\D/g, "")}`,
            };
            const response = await Employee?.CreateEmployee(dataToSend);
            setLoading(false);
            Alert("Muvaffaqiyatli!", "success");
            setOpen(false);
            refresh()
        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert("Xato!", "error");
        }
    };

    return (
        <>
            {/* Button to open modal */}
            <Button onClick={handleOpen}>Yaratish</Button>
            {/* Modal */}
            <Dialog open={open} handler={handleOpen} className="p-2">
                <DialogHeader>Xodim yaratish</DialogHeader>

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

                    <Input
                        label="Parol"
                        type="password"
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
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
                        onClick={CreateAdmin}
                        disabled={loading}
                    >
                        {loading ? "Yuklanmoqda..." : "Saqlash"}
                    </Button>

                </DialogFooter>
            </Dialog>
        </>
    );
}
