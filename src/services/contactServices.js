import axiosInstance from "./axiosInstance";

export const getContacts = async () => {
    return axiosInstance.get("/api");
}

export const postContact = async (contact) => {
    return axiosInstance.post("/api", contact);
}

export const putContact = async (contact) => {
    return axiosInstance.put(`/api/${contact.id}`, contact);
}

export const deleteContact = async (id) => {
    return axiosInstance.delete(`/api/${id}`);
}

export const getDuplicateContacts = async () => {
    return axiosInstance.get("/api/checkDuplicate");
}

export const mergeContacts = async (contactIds) => {
    return axiosInstance.post("/api/bulkDelete", contactIds);
}