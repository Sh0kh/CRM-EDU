import { $api } from "../Headers"

class DebtorApi {
    static GetDebtor = async (data) => {
        const response = await $api.get(`/payment/debtor/${data?.school_id}/${data?.yers}/${data?.month}/page?page=${data?.page}`)
        return response
    }
} export { DebtorApi }