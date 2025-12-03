import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { SubjectApi } from "../../../../utils/Controllers/SubjectApi";
import Cookies from "js-cookie";
import { Alert } from "../../../../utils/Alert";
import Edit from "../../../Other/UI/Icons/Edit";

export default function Put({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const handleOpen = () => setOpen(!open);

    // Подставляем старое значение при открытии модалки
    useEffect(() => {
        if (open && data?.name) {
            setName(data.name);
        }
    }, [open, data]);

    const EditSubject = async () => {
        if (!name.trim()) {
            Alert("Iltimos, nom kiriting!", "warning");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                school_id: Number(Cookies.get("school_id")),
                name: name.trim()
            };
            await SubjectApi.Edit(data.id, payload);

            setLoading(false);
            setOpen(false);
            Alert("Fan muvaffaqiyatli tahrirlandi!", "success");

            if (refresh) refresh();

        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert("Xatolik yuz berdi!", "error");
        }
    };

    return (
        <>
            <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 normal-case p-[8px]"
                onClick={handleOpen}
            >
                <Edit size={18} />
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Fanni tahrirlash</DialogHeader>

                <DialogBody divider className="flex flex-col gap-4">
                    <Input
                        label="Fan nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        Bekor qilish
                    </Button>

                    <Button
                        onClick={EditSubject}
                        disabled={loading}
                    >
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
