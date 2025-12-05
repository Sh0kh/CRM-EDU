import { useEffect, useState } from "react";
import { SubjectApi } from "../../../utils/Controllers/SubjectApi";
import Create from "./_components/Create";
import Cookies from "js-cookie";
import Loading from "../../Other/UI/Loadings/Loading";

import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { Book } from "lucide-react";
import Delete from "./_components/Delete";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Put from "./_components/Put";

export default function Subject() {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    const getSubject = async () => {
        setLoading(true);
        try {
            const response = await SubjectApi?.Get(Cookies.get("school_id"));
            setSubjects(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubject();
    }, []);

    if (loading) return <Loading />;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                <h1 className="text-[25px] font-bold">Fanlar</h1>
                <Create refresh={getSubject} />
            </div>

            {/* Cards */}
            {subjects?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {subjects.map((s) => (
                        <Card
                            key={s.id}
                            className="border border-gray-200 shadow-sm hover:shadow-lg transition rounded-xl"
                        >
                            <CardBody className="flex flex-col gap-2 p-3">
                                {/* Title + Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                    <div className="flex items-center gap-2 text-[16px] sm:text-[18px] font-semibold">
                                        <Book className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                                        <Typography className="text-base sm:text-lg font-semibold">{s.name}</Typography>
                                    </div>
                                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                                        <Put data={s} refresh={getSubject} />
                                        <Delete id={s?.id} refresh={getSubject} />
                                    </div>
                                </div>

                                {/* Created Date */}
                                <Typography className="text-gray-500 text-sm">
                                    Yaralgan: {formatDate(s.createdAt)}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyData text={'Fanlar mavjud emas'} />
            )}
        </>
    );
}
