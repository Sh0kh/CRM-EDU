import { useParams } from "react-router-dom";
import { GroupApi } from "../../../utils/Controllers/GroupApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "../../Other/UI/Loadings/Loading";
import Create from "../Payment/component/Create";
import Attendance from "./_components/attendance";
import StudentOut from "./_components/StudentOut";
import TeacherOut from "./_components/TeacherOut";

export default function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAccordion, setOpenAccordion] = useState(1);
    const [students, setStudents] = useState([]);
    const [employees, setEmployees] = useState([]);

    const GetGroup = async () => {
        try {
            const data = {
                school_id: Number(Cookies?.get("school_id")),
                id: id,
            };
            const response = await GroupApi.GetById(data);
            setGroup(response?.data);

            // Extract students and employees from response
            const groupData = response?.data;
            setStudents(groupData?.students || groupData?.student || []);
            setEmployees(groupData?.employees || groupData?.employee || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (value) => {
        setOpenAccordion(openAccordion === value ? 0 : value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Belgilanmagan';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('uz-UZ');
        } catch (error) {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('uz-UZ').format(Number(price)) + ' so\'m';
    };

    useEffect(() => {
        GetGroup();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!group) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg text-red-600">Guruh topilmadi</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{group.name}</h1>
                <div className={`px-3 py-1 rounded-full text-sm ${group.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {group.status ? 'Faol' : 'Faol emas'}
                </div>
            </div>

            <div className="flex items-start gap-6 w-full">
                {/* Left Column - Group Info, Employees, Students */}
                <div className="w-[30%] space-y-6">
                    {/* Group Basic Info */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Asosiy ma'lumotlar</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="text-gray-600 mb-1">Boshlanish sanasi</div>
                                <div className="font-medium">{formatDate(group.start_date)}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Dars vaqtlari</div>
                                <div className="font-medium">{formatTime(group.start_time)} - {formatTime(group.end_time)}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Narxi</div>
                                <div className="font-medium">{formatPrice(group.price)}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Xona raqami</div>
                                <div className="font-medium">{group.room_id || 'Belgilanmagan'}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Maktab nomi</div>
                                <div className="font-medium">{group.school?.name || 'Belgilanmagan'}</div>
                                <div className="text-sm text-gray-500">{group.school?.address || ''}</div>
                            </div>
                        </div>
                    </div>

                    {/* Employees Accordion */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                            onClick={() => handleOpen(1)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">Ustozlar</span>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {employees.length || 0}
                                </span>
                            </div>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openAccordion === 1 && (
                            <div className="px-6 pb-4">
                                {employees.length > 0 ? (
                                    <div className="space-y-3">
                                        {employees.map((emp, index) => (
                                            <div key={emp.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div >
                                                    <div className="font-medium">{emp?.employee?.full_name}</div>
                                                    <div className="text-sm text-gray-500">{emp?.employee.phone_number}</div>
                                                </div>
                                                <TeacherOut id={emp?.id} refresh={GetGroup} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-center py-4">
                                        Ustoz belgilanmagan
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Students Accordion */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                            onClick={() => handleOpen(2)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">O'quvchilar</span>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {students.length || 0}
                                </span>
                            </div>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openAccordion === 2 && (
                            <div className="px-6 pb-4 space-y-3">
                                {students.length > 0 ? (
                                    students.map((student, index) => (
                                        <div key={student.id || index} className="p-3 border rounded-lg flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{student?.student?.full_name}</div>
                                                <div className="text-sm text-gray-600">{student?.student?.phone_number}</div>
                                            </div>
                                            <div className="flex items-center gap-[10px]">
                                                <Create
                                                    student_id={student.student_id}
                                                    group_id={group.id}
                                                    refresh={GetGroup}
                                                />
                                                <StudentOut
                                                    refresh={GetGroup} id={student?.id}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-center py-4">
                                        O'quvchilar mavjud emas
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column - Attendance Table */}
                <div className="w-[70%]">
                    <Attendance
                        students={students}
                        group={group}
                    />
                </div>
            </div>
        </div>
    );
}