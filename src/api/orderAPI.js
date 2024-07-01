import axios from "axios";

const instance = axios.create({
    baseURL: 'https://internetshop-1.onrender.com/api/order/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    },
});

export const orderAPI = {
    async verifyOrder(id) {
        const {data, status} = await instance.post(`verifyOrder/${id}`);
        return {
            status: status,
            data: data
        }
    },

    async getTakenOrders() {
        const {data, status} = await instance.get("getOrders?sort=takenOrders");
        return {
            status: status,
            products: data
        }
    },

    async getNotVerifiedOrders() {
        const {data, status} = await instance.get("getOrders?sort=notVerified");
        return {
            status: status,
            products: data
        }
    },

    async getMyOrders() {
        const {data, status} = await instance.get("getOrders?sort=mineOrders");
        return {
            status: status, 
            products: data
        }
    },

    async takeOrder(id) {
        const {data, status} = await instance.post(`takeOrder/${id}`);
        return {
            status: status,
            data: data
        }
    },

    async haveOrder(address, products, payment) {
        const {data, status} = await instance.post("haveOrder", {address, products, payment});
        return {
            status: status,
            data: data
        }
    },

    async cancelOrder(id) {
        const {data, status} = await instance.delete(`cancelOrder/${id}`);
        return {
            status: status,
            data: data
        }
    },

    async getNotTakenOrders() {
        const {data, status} = await instance.get("getOrders?sort=notTakenOrders");
        return {
            status: status,
            orders: data
        }
    }

}