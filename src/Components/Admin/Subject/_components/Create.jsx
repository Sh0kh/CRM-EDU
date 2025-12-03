import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
} from "@material-tailwind/react";
import { useState } from "react";
import { SubjectApi } from "../../../../utils/Controllers/SubjectApi";
import Cookies from "js-cookie";
import { Alert } from "../../../../utils/Alert";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const handleOpen = () => setOpen(!open);

    const CreateSubject = async () => {
        if (!name.trim()) {
            Alert("Iltimos, nom kiriting!", "warning");
            return;
        }

        try {
            setLoading(true);

            const data = {
                school_id: Number(Cookies.get("school_id")),
                name: name.trim()
            };

            await SubjectApi.Create(data);

            setLoading(false);
            setOpen(false);
            setName("");
            Alert("Fan muvaffaqiyatli yaratildi!", "success");

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
                className="bg-black text-white"
                onClick={handleOpen}
            >
                + Yaratish
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Fan yaratish</DialogHeader>

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
                        className="bg-black text-white"
                        onClick={CreateSubject}
                        disabled={loading}
                    >
                        {loading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
