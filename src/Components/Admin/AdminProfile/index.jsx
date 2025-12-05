import { useEffect, useState } from "react";
import { Employee } from "../../../utils/Controllers/Employee";
import Cookies from "js-cookie";
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Chip
} from "@material-tailwind/react";
import Loading from "../../Other/UI/Loadings/Loading";

export default function AdminProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const getMy = async () => {
        try {
            const data = {
                school_id: Number(Cookies.get("school_id")),
                id: Number(Cookies.get("uid"))
            };
            const response = await Employee?.GetById(data);

            if (response?.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getMy();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="w-full flex justify-center mt-6">
            <Card className="w-full max-w-xl shadow-lg p-4">
                <CardBody className="flex flex-col items-center gap-4">

                    <Avatar
                        size="xl"
                        variant="circular"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    />

                    <Typography variant="h5" className="font-semibold">
                        {user.full_name}
                    </Typography>

                    <Chip
                        value={user.role.toUpperCase()}
                        color="blue"
                        className="px-3 py-1"
                    />

                    {/* INFO SECTION */}
                    <div className="w-full mt-4 flex flex-col gap-3">

                        <InfoRow label="Telefon raqam" value={user.phone_number} />
                        <InfoRow label="Login" value={user.login} />
                        <InfoRow label="Maosh" value={user.salary + " so'm"} />
                        <InfoRow
                            label="Ro‘yxatdan o‘tgan sana"
                            value={new Date(user.createdAt).toLocaleDateString("uz-UZ")}
                        />
                        <InfoRow
                            label="Oxirgi yangilanish"
                            value={new Date(user.updatedAt).toLocaleDateString("uz-UZ")}
                        />
                        {/* 
                        <InfoRow
                            label="Guruhlar soni"
                            value={(user.group?.length || 0) + " ta"}
                        />

                        <InfoRow
                            label="Fanlar soni"
                            value={(user.subject?.length || 0) + " ta"}
                        /> */}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

// Small reusable component for displaying rows
function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between border-b pb-2 text-gray-800">
            <span className="font-medium">{label}:</span>
            <span>{value}</span>
        </div>
    );
}
