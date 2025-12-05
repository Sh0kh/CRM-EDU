import { useEffect, useState } from "react";
import { ClientApi } from "../../../utils/Controllers/ClitntApi";
import Create from "./_components/Create";
import Cookies from "js-cookie";
import {
    Card,
    CardBody,
    Typography
} from "@material-tailwind/react";
import Loading from "../../Other/UI/Loadings/Loading";
import EmptyData from "../../Other/UI/NoData/EmptyData";
import Delete from "./_components/Delete";

export default function Client() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetClient = async () => {
        setLoading(true);
        try {
            const response = await ClientApi?.Get(Number(Cookies.get("school_id")));
            setClients(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetClient();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-[25px] font-bold">Mijozlar</h1>
                <Create refresh={GetClient} />
            </div>

            {clients.length === 0 ? (
                <EmptyData text={"Mijoz yo'q"} />
            ) : (
                <div className="
                 flex items-center flex-col gap-[10px]
                ">
                    {clients.map((client) => (
                        <Card key={client.id} className="w-full">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <Typography variant="h6">
                                        {client.full_name}
                                    </Typography>
                                    <div className="flex items-center gap-[10px]">
                                        <Delete id={client?.id} refresh={GetClient} />
                                    </div>
                                </div>

                                <Typography color="blue">
                                    {client.phone_number}
                                </Typography>

                                <Typography color="gray">
                                    Fan: {client.subject?.name || "-"}
                                </Typography>

                                <Typography color="gray">
                                    Ijtimoiy tarmoq: {client.social_media?.name || "-"}
                                </Typography>

                                <Typography color="gray">
                                    {client.description}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
