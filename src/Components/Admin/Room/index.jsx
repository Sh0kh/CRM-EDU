import { useEffect, useState } from "react";
import { RoomApi } from "../../../utils/Controllers/RoomApi";
import Create from "./_components/Create";

import { Card, CardBody } from "@material-tailwind/react";
import { Users, Building2 } from "lucide-react";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Delete from "./_components/Delete";
import Put from "./_components/Put";

export default function Room() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true)

    const getRooms = async () => {
        try {
            setLoading(true)
            const response = await RoomApi.Get();
            setRooms(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-[25px] font-bold">Xonalar</h1>
                <Create />
            </div>

            {/* Cards */}
            {rooms?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <Card
                            key={room.id}
                            className="border border-gray-200 shadow-sm rounded-xl p-3 hover:shadow-md transition"
                        >
                            <CardBody className="flex flex-col gap-4 p-[10px]">
                                {/* Название комнаты */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[20px] font-semibold">
                                        <Building2 className="w-6 h-6 text-gray-700" />
                                        {room.name}
                                    </div>
                                    <div className="flex items-center gap-[10px]">
                                        <Put data={room} refresh={getRooms} />
                                        <Delete id={room?.id} refresh={getRooms} />
                                    </div>
                                </div>

                                {/* Вместимость */}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium">
                                        {room.status === "status"
                                            ? "Standart xona"
                                            : `${room.status} o‘quvchi`}
                                    </span>
                                </div>

                                {/* Дата */}
                                <div className="text-gray-500 text-sm">
                                    Yar. sana:{" "}
                                    {new Date(room.createdAt).toLocaleDateString()}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text={'Xona mavjud emas'} />
            )}
        </>
    );
}
