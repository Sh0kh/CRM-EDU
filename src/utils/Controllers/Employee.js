import { $api } from "../Headers"

class Employee {
    static CreateEmployee = async (data) => {
        const response = await $api.post(`/employee`, data)
        return response;
    }
    static GetBySchoolId = async (id) => {
        const response = await $api.get(`/employee/${id}`)
        return response;
    }
    static GetById = async (data) => {
        const response = await $api.get(`/employee/${data?.school_id}/${data?.id}`)
        return response;
    }
    static GetByRole = async (data) => {
        const response = await $api.get(`/employee/${data?.school_id}/${data?.role}/page?page=${data?.page}`)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`/employee/${data?.school_id}/${data?.id}`)
        return response;
    }
    static Edit = async (id, data) => {
        const response = await $api.put(`/employee/${id}/${data?.id}`, data)
        return response;
    }
    static AddSubject = async (data) => {
        const response = await $api.post(`/employee-subject`, data)
        return response;
    }
} export { Employee }