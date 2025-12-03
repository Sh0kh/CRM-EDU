import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { RoomApi } from "../../../../utils/Controllers/RoomApi";
import { GroupApi } from "../../../../utils/Controllers/GroupApi";
import Cookies from "js-cookie";
import { Alert } from "../../../../utils/Alert";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);

    const [data, setData] = useState({
        school_id: Number(Cookies?.get("school_id")),
        name: "",
        price: "",
        start_date: "",
        room_id: "",
        start_time: "",
        end_time: "",
        status: true
    });

    const handleOpen = () => setOpen(!open);

    const getRoom = async () => {
        try {
            const res = await RoomApi.Get();
            setRooms(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open) {
            getRoom();
        }
    }, [open]);

    // 🔥 Форматирование цены: 50000 → 50 000
    const formatPrice = (value) => {
        const onlyNums = value.replace(/\D/g, ""); // оставляем только цифры
        return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handlePriceChange = (e) => {
        const raw = e.target.value.replace(/\s/g, ""); // убираем пробелы
        const formatted = formatPrice(raw);

        setData({
            ...data,
            price: formatted
        });
    };

    const CreateGroup = async () => {
        try {
            setLoading(true);

            // перед отправкой убираем пробелы (backend должен получить число)
            const sendData = {
                ...data,
                price: data.price.replace(/\s/g, "")
            };

            await GroupApi.Create(sendData);

            setLoading(false);
            setOpen(false);
            refresh()

            Alert("Muvaffaqiyatli yaratildi!", "success");

            setData({
                school_id: Number(Cookies?.get("school_id")),
                name: "",
                price: "",
                start_date: "",
                room_id: "",
                start_time: "",
                end_time: "",
                status: true
            });

        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert("Xato!", "error");
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
                <DialogHeader>
                    Guruh yaratish
                </DialogHeader>

                <DialogBody divider className="flex flex-col gap-4">

                    <Input
                        label="Guruh nomi"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />

                    {/* 🔥 formatted price input */}
                    <Input
                        label="Narxi"
                        value={data.price}
                        onChange={handlePriceChange}
                    />

                    <Input
                        type="date"
                        label="Boshlanish sanasi"
                        value={data.start_date}
                        onChange={(e) =>
                            setData({ ...data, start_date: e.target.value })
                        }
                    />

                    <Select
                        label="Xona"
                        value={String(data.room_id)}
                        onChange={(val) =>
                            setData({ ...data, room_id: Number(val) })
                        }
                    >
                        {rooms.map((r) => (
                            <Option key={r.id} value={String(r.id)}>
                                {r.name}
                            </Option>
                        ))}
                    </Select>

                    <Input
                        type="time"
                        label="Boshlanish vaqti"
                        value={data.start_time}
                        onChange={(e) =>
                            setData({ ...data, start_time: e.target.value })
                        }
                    />

                    <Input
                        type="time"
                        label="Tugash vaqti"
                        value={data.end_time}
                        onChange={(e) =>
                            setData({ ...data, end_time: e.target.value })
                        }
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
                        onClick={CreateGroup}
                        disabled={loading}
                    >
                        {loading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
