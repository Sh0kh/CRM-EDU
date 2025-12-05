import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Spinner,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { SubjectApi } from "../../../../utils/Controllers/SubjectApi";
import { SocialMediaApi } from "../../../../utils/Controllers/SocialMediaApi";
import { ClientApi } from "../../../../utils/Controllers/ClitntApi";
import { Alert } from "../../../../utils/Alert";

export default function Create({ refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);
    const [data, setData] = useState({
        full_name: "",
        phone_number: "+998",
        social_media_id: 0,
        subject_id: 0,
        description: "",
        school_id: Number(Cookies.get("school_id")) || 0,
    });

    const handleOpen = () => setOpen(!open);

    const getSubjects = async () => {
        setLoading(true);
        try {
            const response = await SubjectApi.Get(Cookies.get("school_id"));
            setSubjects(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getSocialMedia = async () => {
        setLoading(true);
        try {
            const response = await SocialMediaApi.Get(Cookies.get("school_id"));
            setSocialMedia(response?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            getSubjects();
            getSocialMedia();
        }
    }, [open]);

    const handleCreate = async () => {
        if (!data.full_name || !data.phone_number || !data.social_media_id || !data.subject_id) {
            Alert("Iltimos, barcha majburiy maydonlarni to'ldiring", "warning");
            return;
        }

        try {
            setLoading(true);
            await ClientApi.Create(data);
            Alert("Muvaffaqiyatli yaratildi!", "success");
            handleOpen();
            if (refresh) refresh();
            setData({
                full_name: "",
                phone_number: "+998",
                social_media_id: 0,
                subject_id: 0,
                description: "",
                school_id: Number(Cookies.get("school_id")) || 0,
            })
        } catch (error) {
            console.log(error);
            Alert("Xatolik yuz berdi", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} className="bg-blue-600 hover:bg-blue-700">
                Yaratish
            </Button>

            <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader>Mijoz yaratish</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="To'liq ism"
                            value={data.full_name}
                            onChange={(e) => setData({ ...data, full_name: e.target.value })}
                            required
                        />
                        <Input
                            label="Telefon raqam"
                            value={data.phone_number}
                            onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                            placeholder="=998901234567"
                            required
                        />

                        {/* Простые селекты */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Ijtimoiy tarmoq</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                value={data.social_media_id}
                                onChange={(e) =>
                                    setData({ ...data, social_media_id: Number(e.target.value) })
                                }
                            >
                                <option value={0}>Tanlang</option>
                                {socialMedia.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Fan</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                value={data.subject_id}
                                onChange={(e) =>
                                    setData({ ...data, subject_id: Number(e.target.value) })
                                }
                            >
                                <option value={0}>Tanlang</option>
                                {subjects.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Textarea
                            label="Tavsif"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <Spinner className="w-5 h-5 border-2" />}
                        Yaratish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
