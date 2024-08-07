import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/purchases/`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export const purchaseAPI = {
    async deleteProduct(id) {
        const Response = await instance.delete(`deleteProduct/${id}`);
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async editProductImage(id, file) {
        const formData = new FormData();
        formData.append("file", file);
        const Response = await instance.put(`editProductImage/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return {
            status: Response.status,
            data: Response.data
        }
    },

    async editProduct(id, name, description, price, file) {
        const Response = await instance.put(`editProduct/${id}`, {name, description, price}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return {
            product: Response.data,
            status: Response.status
        }
    },

    async getMyProducts() {
        const Response = await instance.get("getMyProducts");
        return {
            products: Response.data,
            status: Response.status
        }
    },

    async createProduct(name, description, price, quantity, sort) {
        const Response = await instance.post("createProduct", {name, description, price, quantity, sort});
        return {
            Product: Response.data,
            status: Response.status
        }
    },

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
            product: Response.data
        }
    },

    async getAll(page = 1, sort = "popularity", search = "") {
        const Response = await instance.get(`get?pageSize=20&page=${page}&search=${search}&sort=${sort}`);
        return {
            status: Response.status,
            product: Response.data
        }
    }
}