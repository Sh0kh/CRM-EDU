import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { CostCategoryApi } from "../../../../utils/Controllers/CostCategoryApi";
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

    const CreateCategory = async () => {
        setLoading(true);
        try {
            await CostCategoryApi.Create(data);

            Alert("Muvaffaqiyatli yaratildi!", "success");

            setOpen(false);

            // Очистить поля
            setData({
                school_id: Number(Cookies?.get("school_id")),
                name: "",
            });

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
            <Button className="bg-black text-white" onClick={handleOpen}>
                + Yaratish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Xarajat kategoriyasi yaratish</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    <Input
                        label="Kategoriya nomi"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />

                </DialogBody>

                <DialogFooter>
                    <Button variant="text" onClick={handleOpen}>
                        Bekor qilish
                    </Button>

                    <Button
                        className="bg-black text-white"
                        disabled={loading}
                        onClick={CreateCategory}
                    >
                        {loading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
