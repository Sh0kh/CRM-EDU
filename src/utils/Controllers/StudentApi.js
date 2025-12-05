import { $api } from "../Headers"

class StudentApi {
    static Create = async (data) => {
        const response = await $api.post(`/student`, data)
        return response;
    }
    static Get = async (data) => {
        const response = await $api.get(`/student/${data?.school_id}/page?page=${data?.page}`)
        return response;
    }
    static GetById = async (data) => {
        const response = await $api.get(`/student/${data?.school_id}/${data?.id}/group`)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`/student/${data?.school_id}/${data?.id}`)
        return response;
    }
    static Edit = async (id, data) => {
        const response = await $api.put(`/student/${id}/${data?.id}`, data)
        return response;
    }
} export { StudentApi }