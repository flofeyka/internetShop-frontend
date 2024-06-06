import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true
})

export const authAPI = {
    async login(email, password) {
        try {
            const Response = await instance.post("/login", {email, password});
            await localStorage.setItem("accessToken", Response.data.accessToken);
            return {
                status: Response.status,
                user: Response.data.user
            }

        } catch (e) {
            console.log(e);
        }
    },

    async register(email, name, phoneNumber, password) {
        try {
            const Response = await instance.post("/register", {email, name, phoneNumber, password});
            await localStorage.setItem("accessToken", Response.data.accessToken);
            return {
                status: Response.status,
                user: Response.data.user
            }
        } catch (e) {
            console.log(e);
        }
    },

    async getUsersData() {
        try {
            const Response = await instance.get("/getUsersData");
            await localStorage.setItem("accessToken", Response.data.accessToken);
            return {
                user: Response.data.user,
                status: Response.status
            };

        } catch (e) {
            console.log(e);
        }
    },

    async logout() {
        try {
            const Response = await instance.delete("/logout");
            return Response.data;
        } catch (e) {
            console.log(e);
        }
    }
}