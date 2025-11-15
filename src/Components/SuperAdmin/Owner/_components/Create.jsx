import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { User } from "../../../../utils/Controllers/User";
import { Alert } from "../../../../utils/Alert";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);

    const [full_name, setFullName] = useState("");
    const [phone_number, setPhone] = useState("+998");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const CreateOwner = async () => {
        try {
            setLoading(true);

            const data = {
                full_name,
                phone_number,
                login,
                password,
                role: "owner",
            };

            await User?.CreateUser(data);

            setOpen(false);
            Alert("Muvaffaqiyatli!", "success");

            setFullName("");
            setPhone("+998");
            setLogin("");
            setPassword("");
            refresh()
        } catch (error) {
            console.log(error);
            Alert(error?.response?.data?.message || "Xatolik yuz berdi!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Yaratish</Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Yangi Owner yaratish</DialogHeader>

                <DialogBody className="flex flex-col gap-4">

                    <Input
                        label="To‘liq ism"
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <Input
                        label="Telefon raqam"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                        label="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />

                    <div className="relative">
                        <Input
                            type={showPass ? "text" : "password"}
                            label="Parol"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <IconButton
                            variant="text"
                            size="sm"
                            className="!absolute right-2 top-1"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </IconButton>
                    </div>

                </DialogBody>

                <DialogFooter className="flex gap-2">

                    <Button variant="text" onClick={handleOpen} disabled={loading}>
                        Bekor qilish
                    </Button>

                    <Button color="blue" onClick={CreateOwner} disabled={loading}>
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Spinner className="h-4 w-4" /> Yaratilmoqda...
                            </div>
                        ) : (
                            "Yaratish"
                        )}
                    </Button>

                </DialogFooter>
            </Dialog>
        </>
    );
}
