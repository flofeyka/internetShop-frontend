import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/api/purchases/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export const purchaseAPI = {
    async getViewHistory() {
        const Response = await instance.get("getHistory");
        return {
            status: Response.status,
            history: Response.data
        }
    },

    async getOneById(id) {
        const Response = await instance.get(`getOneById/${id}`);
        return {
            status: Response.status,
            purchase: Response.data
        }
    }
}