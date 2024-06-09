import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/favourites/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
});

export const favouritesAPI = {
    async getFavouritesList() {
        const Response = await instance.get("getAll");
        return {
            data: Response.data,
            status: Response.status
        }
    },

    async addFavourite(id) {
        const Response = await instance.post(`/addFavourite/${id}`);
        return {
            data: Response.data,
            status: Response.status
        }
    },

    async deleteFavourite(id) {
        const Response = await instance.delete(`/deleteFavourite/${id}`);
        return {
            data: Response.data,
            status: Response.status
        }
    }
}