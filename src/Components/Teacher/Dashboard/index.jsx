import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
    Card,
    CardBody,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Chip,
} from "@material-tailwind/react";
import { Users, CreditCard } from "lucide-react";
import Loading from "../../Other/UI/Loadings/Loading";
import { Employee } from "../../../utils/Controllers/Employee";
import TeacherPayment from "./_components/TeacherPayment";
import TeacherGroups from "./_components/TeacherGroup";

export default function Dashboard() {
    const [teacher, setTeacher] = useState(null);
    const [activeTab, setActiveTab] = useState("groups");
    const [loading, setLoading] = useState(true);

    const GetTeacher = async () => {
        try {
            const data = {
                id: Number(Cookies.get("uid")),
                school_id: Number(Cookies.get("school_id")),
            };
            const response = await Employee.GetById(data);
            setTeacher(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        GetTeacher();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="">
            {/* ===== Основная информация ===== */}
            <Card className="mb-6">
                <CardBody className="flex flex-col md:flex-row items-start gap-4">
                    <div className="flex-1">
                        <Typography variant="h5" className="font-bold">
                            {teacher.full_name}
                        </Typography>

                        <Typography className="text-gray-600">
                            Telefon: {teacher.phone_number}
                        </Typography>

                        <Typography className="text-gray-600">
                            Role: {teacher.role}
                        </Typography>

                        <Typography className="text-gray-600">
                            Maosh: {teacher.salary?.toLocaleString("ru-RU")} UZS
                        </Typography>

                        <Chip value="Teacher" color="blue" className="mt-2 w-[90px]" />
                    </div>
                </CardBody>
            </Card>

            {/* ========== Tabs ========== */}
            <Tabs value={activeTab} className="w-full">
                <TabsHeader className="bg-gray-100 rounded-lg">
                    <Tab
                        value="groups"
                        onClick={() => setActiveTab("groups")}
                        icon={<Users size={18} />}
                    >
                        Guruhlar
                    </Tab>

                    <Tab
                        value="payments"
                        onClick={() => setActiveTab("payments")}
                        icon={<CreditCard size={18} />}
                    >
                        Tolovlar
                    </Tab>
                </TabsHeader>

                <TabsBody>
                    <TabPanel value="groups">
                        <TeacherGroups groups={teacher.group} />
                    </TabPanel>

                    <TabPanel value="payments">
                        <TeacherPayment />
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
}
