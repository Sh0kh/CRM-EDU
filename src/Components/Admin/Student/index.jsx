import { useEffect, useState } from "react";
import { StudentApi } from "../../../utils/Controllers/StudentApi";
import Create from "./_components/Create";
import Cookies from "js-cookie";

import { Button } from "@material-tailwind/react";
import { Phone, User, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Delete from "./_components/Delete";
import Put from "./_components/Put";
import Eye from "../../Other/UI/Icons/Eye";
import { NavLink } from "react-router-dom";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Add from "./_components/Add";

export default function Student() {
    const [students, setStudents] = useState([]);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        total_pages: 1,
    });
    const [loading, setLoading] = useState(false);

    const GetStudent = async (page = 1) => {
        setLoading(true);
        try {
            const data = {
                school_id: Number(Cookies?.get("school_id")),
                page,
            };

            const response = await StudentApi.Get(data);

            setStudents(response?.data?.data?.records || []);
            setPagination(response?.data?.data?.pagination || {});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetStudent(1);
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-[25px] font-bold">Talabalar</h1>
                <Create refresh={() => GetStudent(pagination.currentPage)} />
            </div>

            {students?.length > 0 ? (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">#</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">O‘quvchi</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Telefon</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Ota-ona</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Ota-ona tel</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Yaratilgan sana</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Ammalar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {students.map((s, index) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2">{index + 1 + (pagination.currentPage - 1) * 10}</td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex items-start gap-[10px]">
                                                <User className="w-5 h-5 text-gray-700" /> {s.full_name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-5 h-5 text-gray-700" /> {s.phone_number}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">{s.parents_full_name}</td>
                                        <td className="px-4 py-2">{s.parents_phone_number}</td>
                                        <td className="px-4 py-2">{s.status ? "Faol" : "No Faol"}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-[10px]">
                                                <Calendar className="w-4 h-4 text-gray-500" /> {new Date(s.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex items-center justify-left gap-[5px]">
                                                <NavLink to={`/admin/student/${s?.id}`}>
                                                    <Button
                                                        className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 normal-case p-[8px]"
                                                    >
                                                        <Eye size={18} />
                                                    </Button>
                                                </NavLink>
                                                <Add student={s} refresh={() => GetStudent(pagination.currentPage)} />
                                                <Put data={s} refresh={() => GetStudent(pagination.currentPage)} />
                                                <Delete id={s?.id} refresh={() => GetStudent(pagination.currentPage)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {pagination?.total_pages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <Button
                                className="bg-black text-white p-3"
                                disabled={pagination.currentPage <= 1 || loading}
                                onClick={() => GetStudent(pagination.currentPage - 1)}
                            >
                                <ChevronLeft className="w-5 h-5" />

                            </Button>

                            <div className="font-medium">{pagination.currentPage} / {pagination.total_pages}</div>

                            <Button
                                className="bg-black text-white p-3"
                                disabled={pagination.currentPage >= pagination.total_pages || loading}
                                onClick={() => GetStudent(pagination.currentPage + 1)}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <EmptyData text={'Talaba mavjud emas'} />
            )}
        </>
    );
}
