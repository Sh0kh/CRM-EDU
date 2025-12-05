import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Alert } from "../../../../utils/Alert";
import { CostApi } from "../../../../utils/Controllers/CostApi";
import { CostCategoryApi } from "../../../../utils/Controllers/CostCategoryApi";
import { PaymentMethodApi } from "../../../../utils/Controllers/PaymentMethodApi";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [methods, setMethods] = useState([]);

    const [data, setData] = useState({
        school_id: Number(Cookies.get("school_id")),
        category_id: "",
        price: "",
        method: "",
        month: "",
        description: ""
    });

    const handleOpen = () => setOpen(!open);

    // CATEGORY GET
    const getCategories = async () => {
        try {
            const res = await CostCategoryApi.Get(data.school_id);
            setCategories(res?.data || []);
        } catch (error) {
            console.log("Category error:", error);
        }
    };

    // PAYMENT METHOD GET
    const getMethods = async () => {
        try {
            const res = await PaymentMethodApi.Get(data.school_id);
            setMethods(res?.data || []);
        } catch (error) {
            console.log("Payment method error:", error);
        }
    };

    useEffect(() => {
        if (open) {
            getCategories();
            getMethods();
        }
    }, [open]);

    const formatPrice = (value) => {
        const clean = value.replace(/\D/g, "");
        return clean.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handlePriceChange = (e) => {
        const raw = e.target.value.replace(/\s/g, "");
        setData({ ...data, price: formatPrice(raw) });
    };

    const CreateCostFunc = async () => {
        try {
            setLoading(true);

            const sendData = {
                school_id: data.school_id,
                category_id: Number(data.category_id),
                price: Number(data.price.replace(/\s/g, "")),
                method: String(data.method),
                month: String(data.month),
                description: data.description
            };

            await CostApi.Create(sendData);

            setLoading(false);
            setOpen(false);
            refresh();
            Alert("Xarajat muvaffaqiyatli yaratildi!", "success");

            setData({
                school_id: Number(Cookies.get("school_id")),
                category_id: "",
                price: "",
                method: "",
                month: "",
                description: ""
            });

        } catch (error) {
            console.log("Cost create error:", error);
            setLoading(false);
            Alert(error?.response?.data?.message || "Xatolik yuz berdi", "error");
        }
    };

    return (
        <>
            <Button className="bg-black text-white" onClick={handleOpen}>
                + Yaratish
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Xarajat yaratish</DialogHeader>

                <DialogBody divider className="flex flex-col gap-4">

                    {/* CATEGORY SELECT */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Xarajat turi (Kategoriya)</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={data.category_id}
                            onChange={(e) => setData({ ...data, category_id: e.target.value })}
                        >
                            <option value="">Tanlang</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* PRICE */}
                    <Input
                        label="Narx"
                        value={data.price}
                        onChange={handlePriceChange}
                    />

                    {/* PAYMENT METHOD SELECT */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">To‘lov turi</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={data.method}
                            onChange={(e) => setData({ ...data, method: e.target.value })}
                        >
                            <option value="">Tanlang</option>
                            {methods.map((m) => (
                                <option key={m.id} value={m.name}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* MONTH SELECT (uzb latin) */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Oy</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            value={data.month}
                            onChange={(e) => setData({ ...data, month: e.target.value })}
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
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Bekor qilish
                    </Button>
                    <Button
                        className="bg-black text-white"
                        onClick={CreateCostFunc}
                        disabled={loading}
                    >
                        {loading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
