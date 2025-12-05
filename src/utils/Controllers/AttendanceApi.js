import { $api } from "../Headers";

class AttendanceApi {
    static Create = async (data) => {
        return await $api.post(`/attendance`, data);
    };
    static Put = async (id, data) => {
        return await $api.put(`/attendance/${id}`, data);
    };
    static Get = async (data) => {
        return await $api.get(`/attendance/${data?.school_id}/${data?.groupId}/${data?.yers}/${data?.month}/page?page=${data?.page}`, data);
    };
}

export { AttendanceApi };
