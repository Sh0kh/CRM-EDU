import { useEffect, useState } from "react";
import { User } from "../../../utils/Controllers/User";
import Cookies from "js-cookie";
import { Card, Typography } from "@material-tailwind/react";
import { MapPin, Image } from "lucide-react";
import CONFIG from "../../../utils/Config";
import { NavLink } from "react-router-dom";
import Loading from "../../Other/UI/Loadings/Loading";

export default function Centers() {
    const id = Cookies.get("uid");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const GetCenter = async () => {
        setLoading(true)
        try {
            const response = await User?.GetUser(id);
            setData(response?.data?.school || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        GetCenter();
    }, []);


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="">
                <h1 className="text-[25px] font-bold">
                    Markazlar
                </h1>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((s) => (
                    <NavLink to={`/owner/center/${s?.id}`}>
                        <Card
                            key={s.id}
                            className="border border-gray-200 rounded-2xl shadow-md bg-white p-5 transition hover:shadow-xl"
                        >
                            <div className="flex flex-col items-start gap-3">

                                {/* Foto */}
                                {s?.image ? (
                                    <img
                                        className="h-40 rounded-xl  border border-gray-300"
                                        src={`${CONFIG?.API_URL}/${s?.image}`}
                                        alt="Maktab rasmi"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center border">
                                        <Image className="w-12 h-12 text-gray-500" />
                                    </div>
                                )}

                                {/* Nomi */}
                                <Typography variant="h6" className="text-black font-semibold">
                                    {s.name}
                                </Typography>

                                {/* Manzil */}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin className="w-5 h-5 text-black" />
                                    <Typography className="text-sm">{s.address}</Typography>
                                </div>

                                {/* Sana */}
                                <Typography className="text-xs text-gray-500 mt-2">
                                    Yaratilgan: {new Date(s.createdAt).toLocaleString()}
                                </Typography>
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </>
    );
}
