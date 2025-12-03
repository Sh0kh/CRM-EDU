import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { SocialMediaApi } from "../../../../utils/Controllers/SocialMediaApi";
import { Alert } from "../../../../utils/Alert";
import EditIcon from "../../../Other/UI/Icons/Edit";

export default function Put({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: data?.name || "",
        school_id: data?.school_id,
    });

    const handleOpen = () => {
        setOpen(!open);

        // при открытии заполняем актуальными данными
        if (!open) {
            setForm({
                name: data?.name,
                school_id: data?.school_id,
            });
        }
    };

    const EditSocialMedia = async () => {
        setLoading(true);
        try {
            await SocialMediaApi.Edit(data?.id, form);

            Alert("Muvaffaqiyatli o'zgartirildi!", "success");
            setOpen(false);

            if (refresh) refresh();
        } catch (error) {
            console.log(error);
            Alert("Xato!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Edit button */}
            <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 normal-case p-[8px]"
                onClick={handleOpen}
            >
                <EditIcon size={18} />
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Ijtimoiy tarmoqni tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    <Input
                        label="Ijtimoiy tarmoq nomi"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                </DialogBody>

                <DialogFooter>
                    <Button variant="text" onClick={handleOpen}>
                        Bekor qilish
                    </Button>

                    <Button
                        disabled={loading}
                        onClick={EditSocialMedia}
                    >
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
