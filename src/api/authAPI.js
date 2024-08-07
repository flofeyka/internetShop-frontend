import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/auth`,
    withCredentials: true
})

export const authAPI = {
    async login(email, password) {
        try {
            const Response = await instance.post("/login", {email, password});
            localStorage.setItem("accessToken", Response.data.accessToken);
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
            localStorage.setItem("accessToken", Response.data.accessToken);
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
            localStorage.setItem("accessToken", Response.data.accessToken);
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
            localStorage.clear();
            return Response.data;
        } catch (e) {
            console.log(e);
        }
    }
}