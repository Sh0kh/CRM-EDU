import { useEffect, useState } from "react";
import { CostCategoryApi } from "../../../utils/Controllers/CostCategoryApi";
import Cookies from "js-cookie";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Create from "./_components/Create";
import { FolderKanban } from "lucide-react";
import Delete from "./_components/Delete";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Put from "./_components/Put";

// форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function CostCategory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getCostCategory = async () => {
        try {
            const response = await CostCategoryApi.Get(Cookies?.get("school_id"));
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCostCategory();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3">
                <h1 className="text-[25px] font-bold">Xarajat turi</h1>
                <Create refresh={getCostCategory} />
            </div>

            {/* Cards */}
            {data?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            className="w-full border border-gray-200 shadow-sm rounded-lg p-4 hover:shadow-md transition flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                {/* Название и иконка */}
                                <div className="flex items-center gap-3">
                                    <FolderKanban size={28} className="text-gray-700" />
                                    <Typography variant="h6" className="font-semibold">
                                        {item.name}
                                    </Typography>
                                </div>

                                {/* Кнопки действий */}
                                <div className="flex gap-2 flex-wrap">
                                    <Put data={item} refresh={getCostCategory} />
                                    <Delete id={item.id} refresh={getCostCategory} />
                                </div>
                            </div>

                            {/* Дата создания */}
                            <Typography className="text-gray-500 text-sm mt-1">
                                Yaratilgan: {formatDate(item.createdAt)}
                            </Typography>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text="Xarajat turi mavjud emas" />
            )}
        </>
    );
}
