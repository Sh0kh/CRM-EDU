import { $api } from "../Headers"

class SocialMediaApi {
    static Create = async (data) => {
        const response = await $api.post(`/social-media`, data)
        return response;
    }
    static Get = async (id) => {
        const response = await $api.get(`/social-media/${id}`)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`/social-media/${data?.school_id}/${data?.id}`)
        return response;
    }
    static Edit = async (id, data) => {
        const response = await $api.put(`/social-media/${data?.school_id}/${id}`, data)
        return response;
    }
} export { SocialMediaApi }