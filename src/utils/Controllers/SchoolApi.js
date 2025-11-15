import { $api } from "../Headers"

class School {
    static CreateSchool = async (data) => {
        const response = await $api.post(`/school`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }
}

export { School }
