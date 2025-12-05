import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Button } from "@material-tailwind/react";
import { Calendar, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";

import { CostApi } from "../../../utils/Controllers/CostApi";

import Create from "./_components/Create";

import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Put from "./_components/Put";
import Delete from "./_components/Delete";

export default function Cost() {
    const [costs, setCosts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        total_pages: 1,
    });
    const [loading, setLoading] = useState(false);

    const GetCosts = async (page = 1) => {
        setLoading(true);
        try {
            const school_id = Number(Cookies.get("school_id"));

            const res = await CostApi.GetPagination({
                school_id,
                year: 2025,
                month: 12,
                page
            });

            setCosts(res?.data?.data?.records || []);
            setPagination(res?.data?.data?.pagination || {});
        } catch (error) {
            console.log("Cost Get Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetCosts(1);
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3">
                <h1 className="text-[25px] font-bold">Xarajatlar</h1>
                <Create refresh={() => GetCosts(pagination.currentPage)} />
            </div>

            {costs.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {costs.map((item, index) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg shadow-sm p-4 w-full flex flex-col gap-2 bg-white"
                        >
                            {/* Верхняя часть: номер и название */}
                            <div className="flex justify-between items-center flex-wrap gap-2">
                                <span className="font-semibold text-gray-800">
                                    {index + 1 + (pagination.currentPage - 1) * 10}. {item.costCategory?.name}
                                </span>
                                <div className="flex gap-2 flex-wrap">
                                    <Put data={item} refresh={() => GetCosts(pagination.currentPage)} />
                                    <Delete id={item.id} refresh={() => GetCosts(pagination.currentPage)} />
                                </div>
                            </div>

                            {/* Цена и метод */}
                            <div className="flex justify-between items-center text-gray-700 text-sm flex-wrap gap-2">
                                <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {item.price.toLocaleString()} so‘m
                                </span>
                                <span>
                                    {item.method === 1 ? "Naqd" : item.method === 2 ? "Karta" : "Bank o'tkazma"}
                                </span>
                            </div>

                            {/* Дополнительная информация */}
                            <div className="text-gray-500 text-xs">
                                Oy: {item.month}-oy <br />
                                Izoh: {item.description || "Izoh yo‘q"} <br />
                                Sana: <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {pagination?.total_pages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                            <Button
                                className="bg-black text-white p-3 flex items-center justify-center"
                                disabled={pagination.currentPage <= 1}
                                onClick={() => GetCosts(pagination.currentPage - 1)}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <span className="font-medium text-gray-700">
                                {pagination.currentPage} / {pagination.total_pages}
                            </span>

                            <Button
                                className="bg-black text-white p-3 flex items-center justify-center"
                                disabled={pagination.currentPage >= pagination.total_pages}
                                onClick={() => GetCosts(pagination.currentPage + 1)}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <EmptyData text="Xarajatlar mavjud emas" />
            )}
        </>
    );
}
