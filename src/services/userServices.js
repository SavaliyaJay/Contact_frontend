import axiosInstance from "./axiosInstance";

export const postLoggedInUserApi = (userdata) => {
    return axiosInstance.post("/api/users/login", userdata);
};