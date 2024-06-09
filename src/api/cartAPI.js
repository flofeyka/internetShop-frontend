import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/cart/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export const cartAPI = {
    async addOne(id) {
        const Response = await instance.post(`/addOne/${id}`);
        return {
            result: Response.data,
            status: Response.status
        }
    },

    async deleteOne(id) {
        const Response = await instance.delete(`/deleteOne/${id}`);
        return {
            result: Response.data,
            status: Response.status
        }
    },

    async getAll() {
        const Response = await instance.get(`/getAll`);
        return {
            cartList: Response.data,
            status: Response.status
        }
    }
}