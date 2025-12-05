import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Button,
    Chip,
    Spinner,
} from "@material-tailwind/react";
import { Payment } from "../../../../utils/Controllers/Payment";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import EmptyData from "../../../Other/UI/NoData/EmptyData";

export default function TeacherPayment() {
    const [payments, setPayments] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    const [year, setYear] = useState("2025");
    const [month, setMonth] = useState(12);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const GetPayment = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const data = {
                id: id,
                school_id: Number(Cookies.get("school_id")),
                yers: year,
                month: Number(month),
                page: pageNumber,
            };

            const response = await Payment.GetPaymentEmployee(data);

            setPayments(response?.data?.data?.records || []);
            setTotalSum(response?.data?.data?.total_sum || 0);
            setTotalPages(response?.data?.data?.total_pages || 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetPayment(page);
    }, [page]);

    const applyFilter = () => {
        setPage(1);
        GetPayment(1);
    };

    const uzMonths = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];

    return (
        <div className="w-full">
            {/* Filter */}
            <Card className="mb-4 p-4">
                <Typography variant="h6" className="font-bold mb-3">
                    To‘lovni filterlash
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Select label="Yilni tanlang" value={year} onChange={(val) => setYear(val)}>
                        <Option value="2024">2024</Option>
                        <Option value="2025">2025</Option>
                        <Option value="2026">2026</Option>
                    </Select>

                    <Select label="Oyni tanlang" value={String(month)} onChange={(val) => setMonth(val)}>
                        {uzMonths.map((m, i) => (
                            <Option key={i} value={String(i + 1)}>
                                {m}
                            </Option>
                        ))}
                    </Select>

                    <Button onClick={applyFilter} className="bg-blue-600 mt-1">
                        Filterni qo‘llash
                    </Button>
                </div>
            </Card>

            {/* Total */}
            <Card className="mb-4 p-4">
                <Typography variant="h6" className="font-bold">
                    Umumiy summa: {totalSum.toLocaleString("ru-RU")} UZS
                </Typography>
            </Card>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <Spinner className="h-10 w-10" />
                </div>
            ) : payments.length === 0 ? (
                <EmptyData text={'Tolov yo`q'} />
            ) : (
                <>
                    {payments.map((p) => (
                        <Card key={p.id} className="mb-4 w-full">
                            <CardBody className="flex justify-between items-center">
                                <div>
                                    <Typography className="font-bold text-lg">
                                        {p.student_name}
                                    </Typography>

                                    <Typography className="text-gray-600">
                                        {uzMonths[p.month - 1]}
                                    </Typography>

                                    <Typography className="text-gray-600">
                                        {p.price.toLocaleString("ru-RU")} UZS
                                    </Typography>
                                </div>


                            </CardBody>
                        </Card>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="bg-gray-700"
                        >
                            Oldingi
                        </Button>

                        <Typography>
                            {page} / {totalPages}
                        </Typography>

                        <Button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="bg-gray-700"
                        >
                            Keyingi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
