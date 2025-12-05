import { useEffect, useState } from "react";
import { SocialMediaApi } from "../../../utils/Controllers/SocialMediaApi";
import Cookies from "js-cookie";
import Create from "./_components/Create";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Globe } from "lucide-react";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Delete from "./_components/Delete";
import Put from "./_components/Put";

export default function SocialMedia() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

        const getSocialMedia = async () => {
            setLoading(true);
            try {
                const response = await SocialMediaApi.Get(Cookies?.get("school_id"));
                setItems(response?.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        getSocialMedia();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3 sm:gap-0">
                <h1 className="text-[25px] font-bold">Ijtimoiy tarmoqlar</h1>
                <Create refresh={getSocialMedia} />
            </div>

            {/* Cards */}
            {items?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-3"
                        >
                            <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3">
                                {/* Icon + Text */}
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <Globe size={24} className="text-gray-700" />
                                    </div>
                                    <Typography variant="h6" className="font-semibold text-base sm:text-lg">
                                        {item.name}
                                    </Typography>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                                    <Put data={item} refresh={getSocialMedia} />
                                    <Delete id={item?.id} refresh={getSocialMedia} />
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text={"Ijtimoiy tarmoq mavjud emas"} />
            )}
        </>
    );
}
