import { Button } from "@material-tailwind/react";
import { CostCategoryApi } from "../../../../utils/Controllers/CostCategoryApi";
import { useEffect } from "react";

export default function Create() {

    const GetCostegory = async () => {
        try {
            const response = await CostCategoryApi.Get()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetCostegory()
    }, [])

    return (
        <>
            <Button>
                + Yaratish
            </Button>
        </>
    )
}