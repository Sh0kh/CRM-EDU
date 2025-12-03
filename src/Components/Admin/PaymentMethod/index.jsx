import { useEffect, useState } from "react";
import { PaymentMethodApi } from "../../../utils/Controllers/PaymentMethodApi";
import Create from "./_components/Create";
import Cookies from "js-cookie";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { CreditCard } from "lucide-react";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Delete from "./_components/Delete";
import Put from "./_components/Put";

export default function PaymentMethod() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

    const GetPaymentMethod = async () => {
        setLoading(true)
        try {
            const response = await PaymentMethodApi.Get(Cookies?.get("school_id"));
            setItems(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        GetPaymentMethod();
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
                <h1 className="text-[25px] font-bold">To'lov turlari</h1>
                <Create refresh={GetPaymentMethod} />
            </div>

            {/* Cards Grid */}
            {items?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-3"
                        >
                            <CardBody className="p-[0px]">
                                {/* Icon */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-xl">
                                            <CreditCard size={28} className="text-gray-700" />
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <Typography variant="h6" className="font-semibold">
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[10px]">
                                        <Put data={item} refresh={GetPaymentMethod} />
                                        <Delete id={item?.id} refresh={GetPaymentMethod} />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}

                </div>
            ) : (
                <EmptyData text={'Tolov turi mavjud emas'} />
            )}
        </>
    );
}
