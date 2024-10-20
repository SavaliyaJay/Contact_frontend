import axiosInstance from "./axiosInstance";


export const postFile = async (contacts) => {
    return axiosInstance.post("/api/bulkUpload", contacts);
}