import { $api } from "../Headers"

class Statistik {
    static GetCard = async (id) => {
        const response = await $api.get(`statistic/school/${id}`)
        return response
    }
    static GetLine = async (data) => {
        const response = await $api.get(`statistic/school-payments/${data?.id}/${data?.years}`)
        return response
    }
} export { Statistik }