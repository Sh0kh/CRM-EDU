import { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Alert } from "../../../../utils/Alert";
import DeleteIcon from "../../../Other/UI/Icons/DeleteIcon";
import Cookies from "js-cookie";
import { SocialMediaApi } from "../../../../utils/Controllers/SocialMediaApi";

export default function Delete({ id, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const DeletePaymentMethod = async () => {
        try {
            setLoading(true);

            const data = {
                school_id: Cookies.get("school_id"),
                id: id
            };
            await SocialMediaApi?.Delete(data);
            Alert("Muvaffaqiyatli o'chirildi!", "success");
            handleOpen();
            refresh();
        } catch (error) {
            console.log(error);
            Alert("Xato!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Delete Button */}
            <Button
                onClick={handleOpen}
                className="bg-red-600 text-white hover:bg-red-700 active:bg-red-800 normal-case p-[8px] transition-colors duration-200"
            >
                <DeleteIcon size={18} />
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader className="text-lg font-semibold flex items-center gap-2">
                    Ijtimoiy tarmoqni o‘chirish
                </DialogHeader>

                <DialogBody className="text-gray-700 text-[15px] font-bold py-0">
                    Siz rostdan ham ushbu  Ijtimoiy tarmoqni o‘chirmoqchimisiz?
                </DialogBody>

                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="text"
                        className="normal-case"
                        onClick={handleOpen}
                        disabled={loading}
                    >
                        Bekor qilish
                    </Button>

                    <Button
                        className="bg-red-600 text-white hover:bg-red-700 normal-case flex items-center gap-2"
                        onClick={DeletePaymentMethod}
                        disabled={loading}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "O‘chirilmoqda..." : "Ha, o‘chirish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
