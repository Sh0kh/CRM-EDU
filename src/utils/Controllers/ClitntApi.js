import { $api } from "../Headers"

class ClientApi {
    static Create = async (data) => {
        const response = await $api.post(`/customer`, data)
        return response;
    }
    static Get = async (id) => {
        const response = await $api.get(`/customer/${id}`,)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`/customer/${data?.school_id}/${data?.id}`,)
        return response;
    }
} export { ClientApi }