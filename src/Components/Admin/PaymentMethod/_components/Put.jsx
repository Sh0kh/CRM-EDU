import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { PaymentMethodApi } from "../../../../utils/Controllers/PaymentMethodApi";
import { Alert } from "../../../../utils/Alert";
import Edit from "../../../Other/UI/Icons/Edit";

export default function Put({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: data?.name || "",
        school_id: data?.school_id,
    });

    const handleOpen = () => {
        setOpen(!open);

        // при открытии заново заполняем поля текущими значениями
        if (!open) {
            setForm({
                name: data?.name,
                school_id: data?.school_id,
            });
        }
    };

    const EditPaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await PaymentMethodApi.Put(data?.id, form);
            Alert("Muvaffaqiyatli o'zgartirildi!", "success");
            setOpen(false);
            refresh();
        } catch (error) {
            console.log(error);
            Alert("Xato!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Кнопка Edit */}
            <Button
                className="bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 normal-case p-[8px]"
                onClick={handleOpen}
            >
                <Edit size={18} />
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>To'lov turini tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    <Input
                        label="To'lov turi nomi"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                </DialogBody>

                <DialogFooter>

                    <Button
                        className="mr-2"
                        variant="text"
                        onClick={handleOpen}
                    >
                        Bekor qilish
                    </Button>

                    <Button
                        onClick={EditPaymentMethod}
                        disabled={loading}
                    >
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
