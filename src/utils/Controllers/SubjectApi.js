import { $api } from "../Headers"

class SubjectApi {
    static Create = async (data) => {
        const response = await $api.post(`/subject`, data)
        return response;
    }
    static Get = async (id) => {
        const response = await $api.get(`/subject/${id}`)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`/subject/${data?.school_id}/${data?.id}`)
        return response;
    }
    static Edit = async (id, data) => {
        const response = await $api.put(`/subject/${data?.school_id}/${id}`, data)
        return response;
    }
} export { SubjectApi }