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
import Cookies from "js-cookie";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        school_id: Number(Cookies?.get("school_id")),
        name: "",
    });

    const handleOpen = () => setOpen(!open);

    const CreatePaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await PaymentMethodApi.Create(data);
            Alert("Muvaffaqiyatli yaratildi!", "success");
            setOpen(false);
            setData({ school_id: 1, name: "" }); // Tozalash
            refresh()
        } catch (error) {
            console.log(error);
            Alert("Xato!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button className="bg-black text-white" onClick={handleOpen}>
                + Yaratish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>To'lov turini yaratish</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    {/* Nomi */}
                    <Input
                        label="To'lov turi nomi"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
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
                        className="bg-black text-white"
                        onClick={CreatePaymentMethod}
                        disabled={loading}
                    >
                        {loading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
