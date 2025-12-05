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
import { CostApi } from "../../../../utils/Controllers/CostApi";
import { CostCategoryApi } from "../../../../utils/Controllers/CostCategoryApi";
import { PaymentMethodApi } from "../../../../utils/Controllers/PaymentMethodApi";
import Cookies from "js-cookie";

export default function Put({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const school_id = Number(Cookies?.get("school_id"));
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [methods, setMethods] = useState([]); // <- добавили state для методов оплаты

    const [EditData, setEditData] = useState({
        category_id: data?.category_id || "",
        price: data?.price ? String(data?.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "",
        method: data?.method || "",
        month: data?.month || "1",
        description: data?.description || "",
    });

    const GetCategories = async () => {
        try {
            const res = await CostCategoryApi.GetAll(school_id);
            setCategories(res?.data || []);
        } catch (error) {
            console.log("Category Get Error:", error);
        }
    };

    const GetMethods = async () => {
        try {
            const res = await PaymentMethodApi.Get(school_id);
            setMethods(res?.data || []);
        } catch (error) {
            console.log("Payment Method Get Error:", error);
        }
    };

    useEffect(() => {
        GetCategories();
        GetMethods();
    }, []);

    const formatPrice = (value) => {
        const clean = value.replace(/\D/g, "");
        return clean.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handlePriceChange = (e) => {
        const raw = e.target.value.replace(/\s/g, "");
        setEditData({ ...EditData, price: formatPrice(raw) });
    };

    const EditCost = async () => {
        setLoading(true);
        try {
            const sendData = {
                ...EditData,
                category_id: Number(EditData.category_id),
                price: Number(EditData.price.replace(/\s/g, "")),
            };
            await CostApi.Edit(school_id, data?.id, sendData);
            Alert("Xarajat muvaffaqiyatli tahrirlandi!", "success");
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
                <DialogHeader>Xarajatni tahrirlash</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    {/* CATEGORY SELECT */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Kategoriya</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={EditData.category_id}
                            onChange={(e) => setEditData({ ...EditData, category_id: e.target.value })}
                        >
                            <option value="">Tanlang</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* PRICE */}
                    <Input
                        label="Narx"
                        value={EditData.price}
                        onChange={handlePriceChange}
                    />

                    {/* PAYMENT METHOD SELECT */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">To‘lov metodi</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={EditData.method}
                            onChange={(e) => setEditData({ ...EditData, method: e.target.value })}
                        >
                            <option value="">Tanlang</option>
                            {methods.map((m) => (
                                <option key={m.id} value={m.name}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* MONTH SELECT */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Oy</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={EditData.month}
                            onChange={(e) => setEditData({ ...EditData, month: e.target.value })}
                        >
                            <option value="">Tanlang</option>
                            <option value="1">Yanvar</option>
                            <option value="2">Fevral</option>
                            <option value="3">Mart</option>
                            <option value="4">Aprel</option>
                            <option value="5">May</option>
                            <option value="6">Iyun</option>
                            <option value="7">Iyul</option>
                            <option value="8">Avgust</option>
                            <option value="9">Sentabr</option>
                            <option value="10">Oktabr</option>
                            <option value="11">Noyabr</option>
                            <option value="12">Dekabr</option>
                        </select>
                    </div>

                    {/* DESCRIPTION */}
                    <Input
                        label="Izoh"
                        value={EditData.description}
                        onChange={(e) => setEditData({ ...EditData, description: e.target.value })}
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
                        onClick={EditCost}
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
