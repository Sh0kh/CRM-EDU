import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { GroupApi } from "../../../../utils/Controllers/GroupApi";
import { useEffect } from "react";

export default function Add({ student }) {

    const GetGroups = async () => {
        try {
            const response = await GroupApi.Get()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetGroups()
    }, [])




    return (
        <>
            <Button
                className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 normal-case p-[8px]"
            >
                <Plus size={18} />
            </Button>
        </>
    )
}