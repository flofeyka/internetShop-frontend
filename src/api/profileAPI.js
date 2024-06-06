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
    }
}