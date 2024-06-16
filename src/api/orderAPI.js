import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/order/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    },
});

export const orderAPI = {
    async verifyOrder(id) {
        const Response = await instance.post(`verifyOrder/${id}`);
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async getTakenOrders() {
        const Response = await instance.get("getTakenOrders");
        return {
            status: Response.status,
            products: Response.data
        }
    },

    async getNotVerifiedOrders() {
        const Response = await instance.get("getNotVerifiedOrders");
        return {
            status: Response.status,
            products: Response.data
        }
    },

    async getMyOrders() {
        const Response = await instance.get("getMyOrders");
        return {
            status: Response.status, 
            products: Response.data
        }
    },

    async takeOrder(id) {
        const Response = await instance.post(`takeOrder/${id}`);
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async haveOrder(address, products, payment) {
        const Response = await instance.post("haveOrder", {address, products, payment});
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async cancelOrder(id) {
        const Response = await instance.delete(`cancelOrder/${id}`);
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async getNotTakenOrders() {
        const Response = await instance.get("getOrders");
        return {
            status: Response.status,
            orders: Response.data
        }
    }

}