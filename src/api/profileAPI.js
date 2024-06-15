import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/profile/',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
});

export const profileAPI = {
    async getProfileById(id) {
        const Response = await instance.get(`getUserById/${id}`);
        return {
            status: Response.status,
            user: Response.data
        }
    },

    async updateProfileInfo(payload) {
        const Response = await instance.put(`updateProfileData`, {...payload});
        return {
            status: Response.status,
            data: Response.data.user
        }
    },

    async getOwners() {
        const Response = await instance.get("getOwners");
        return {
            status: Response.status,
            owners: Response.data
        }
    }
}