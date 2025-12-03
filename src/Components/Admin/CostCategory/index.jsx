import { useEffect, useState } from "react";
import { CostCategoryApi } from "../../../utils/Controllers/CostCategoryApi";
import Cookies from "js-cookie";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Create from "./_components/Create";
import { FolderKanban } from "lucide-react"; // <-- icon
import Delete from "./_components/Delete";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Put from "./_components/Put";

// функция форматирования даты
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

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState([]);

    const getCostCategory = async () => {
        try {
            const response = await CostCategoryApi.Get(Cookies?.get("school_id"));
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getCostCategory();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-[25px] font-bold">Xarajat turi</h1>
                <Create refresh={getCostCategory} />
            </div>

            {/* Cards list */}
            {data?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {data.map((item) => (
                        <Card key={item.id} className="shadow-md">
                            <CardBody className="flex items-start gap-3">
                                {/* ICON */}
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-[10px]">
                                            <FolderKanban size={32} className="text-gray-700" />
                                            <Typography variant="h6" className="font-bold">
                                                {item.name}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <Put data={item} refresh={getCostCategory} />
                                            <Delete id={item?.id} refresh={getCostCategory} />
                                        </div>
                                    </div>
                                    <Typography className="text-gray-600 text-sm mt-2">
                                        Yaratilgan: {formatDate(item.createdAt)}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text={"Xarajat turi mavjud emas"} />
            )}
        </>
    );
}
