import axios from "axios";

const instance = axios.create({
  baseURL: `https://internetshop-1.onrender.com/api/cart/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const cartAPI = {
  async addOne(id) {
    try {
      const Response = await instance.post(`addOne/${id}`);
      return {
        result: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async deleteOne(id) {
    try {
      const Response = await instance.delete(`deleteOne/${id}`);
      return {
        result: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async getAll() {
    try {
      const Response = await instance.get(`getAll`);
      return {
        cartList: Response.data,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },

  async updateProductCount(id, count) {
    try {
      const Response = await instance.put(`updateProductCount`, { id, count });
      return {
        cartList: Response.data.cartList,
        status: Response.status,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
