import { useEffect, useState } from "react";
import Put from "./component/Put";
import Create from "./component/Create";
import Delete from "./component/Delete";

import { Card, CardBody, Button } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight, Users, Wallet } from "lucide-react";

import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Cookies from "js-cookie";
import { SalaryApi } from "../../../utils/Controllers/Salary";

export default function Salary() {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const school_id = Number(Cookies.get("school_id"));
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const getSalaries = async (p = page) => {
        try {
            setLoading(true);
            const response = await SalaryApi.GetByMonth({
                school_id,
                year: currentYear,
                month: currentMonth,
                page: p,
            });
            const data = response?.data?.data;
            setSalaries(data?.records || []);
            setTotalPages(data?.pagination?.total_pages || 1);
        } catch (error) {
            console.log("Salary fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSalaries(page);
    }, [page]);

    if (loading) return <Loading />;

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3">
                <h1 className="text-[25px] font-bold">Oylik To'lovlar</h1>
                <Create refresh={() => getSalaries(page)} />
            </div>

            {salaries.length > 0 ? (
                <>
                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                        {salaries.map((salary) => (
                            <Card
                                key={salary.id}
                                className="border border-gray-200 shadow-sm rounded-xl p-3 hover:shadow-md transition"
                            >
                                <CardBody className="flex flex-col gap-3 p-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <div className="flex items-center gap-2 text-[18px] font-semibold flex-1">
                                            <Wallet className="w-5 h-5 text-gray-700" />
                                            {salary.teacher?.full_name}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Put data={salary} refresh={() => getSalaries(page)} />
                                            <Delete id={salary.id} refresh={() => getSalaries(page)} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700 text-[15px]">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>
                                                {salary.price.toLocaleString()} so‘m — {salary.method}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-gray-500 text-[13px] leading-5 break-words">
                                        Oy: {salary.month} <br />
                                        Izoh: {salary.description || "Izoh yo‘q"}
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
                        <Button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            size="sm"
                            className="flex items-center justify-center"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        <span className="text-gray-700 font-medium">
                            {page} / {totalPages}
                        </span>

                        <Button
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            size="sm"
                            className="flex items-center justify-center"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </>
            ) : (
                <EmptyData text="Hozircha to‘lovlar mavjud emas" />
            )}
        </>
    );
}
