import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:5000/api/favourites/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const favouritesAPI = {
  async getFavouritesList() {
    try {
      const Response = await instance.get("getAll");
      return {
        data: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async addFavourite(id) {
    try {
      const Response = await instance.post(`/addFavourite/${id}`);
      return {
        product: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async deleteFavourite(id) {
    try {
      const Response = await instance.delete(`/deleteFavourite/${id}`);
      return {
        data: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
