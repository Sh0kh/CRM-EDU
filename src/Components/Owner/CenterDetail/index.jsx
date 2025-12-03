import { useParams } from "react-router-dom";
import { School } from "../../../utils/Controllers/SchoolApi";
import { useEffect, useState } from "react";
import Create from "./_components/Create";
import { Employee } from "../../../utils/Controllers/Employee";
import Loading from "../../Other/UI/Loadings/Loading";
import { Users, CalendarDays, Phone, BadgeCheck } from "lucide-react";
import { Card, Typography } from "@material-tailwind/react";
import Delete from "./_components/Delete";
import Put from "./_components/Put";
import EmptyData from "../../Other/UI/NoData/EmptyData";

export default function CenterDetail() {
    const { id } = useParams();

    const [centerData, setCenterData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const [centerRes, empRes] = await Promise.all([
                School.GetById(id),
                Employee.GetBySchoolId(id),
            ]);

            setCenterData(centerRes?.data);
            setEmployees(empRes?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    if (loading) return <Loading />;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-[25px] font-bold flex items-center gap-2">
                    <Users size={26} /> {centerData?.name}
                </h1>
                <Create refresh={loadData} />
            </div>

            <Card className="p-5 border border-gray-300 shadow-sm rounded-xl">
                <Typography variant="h5" className="mb-4 flex items-center gap-2">
                    <BadgeCheck size={22} /> Xodimlar ro'yxati
                </Typography>
                {employees?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {employees?.map((emp) => (
                            <Card
                                key={emp.id}
                                className="p-4 border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition bg-white"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Users size={18} /> {emp.full_name}
                                    </h3>
                                    <div className="flex items-center gap-[10px]">
                                        <Put employee={emp} refresh={loadData} />
                                        <Delete employee_id={emp?.id} refresh={loadData} />
                                    </div>
                                </div>

                                <div className="mt-2 space-y-1 text-gray-700 text-sm">
                                    <p className="flex items-center gap-2">
                                        <Phone size={16} /> {emp.phone_number}
                                    </p>

                                    <p className="flex items-center gap-2 capitalize">
                                        <BadgeCheck size={16} /> {emp.role}
                                    </p>

                                    <p className="flex items-center gap-2 mt-2 font-medium">
                                        <CalendarDays size={16} /> {formatDate(emp.createdAt)}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <EmptyData text={'Xodim mavjud emas'} />
                )}
            </Card>
        </>
    );
}
