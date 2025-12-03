import { $api } from "../Headers"

class PaymentMethodApi {
    static Create = async (data) => {
        const response = await $api.post(`/payment-method`, data)
        return response;
    }
    static Get = async (id) => {
        const response = await $api.get(`/payment-method/${id}`)
        return response;
    }
    static Delete = async (data) => {
        const response = await $api.delete(`payment-method/${data?.school_id}/${data?.id}`)
        return response;
    }
    static Put = async (id, data) => {
        const response = await $api.put(`payment-method/${data?.school_id}/${id}`, data)
        return response;
    }
} export { PaymentMethodApi }