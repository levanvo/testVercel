import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:8080/`
});

export const All_Categories = async () => {
    return await instance.get(`/categories`);
};
export const One_Categories = async (id) => {
    return await instance.get(`/categories/${id}`);
};
export const Create_Categories = async (data) => {
    return await instance.post(`/categories`, data);
};
export const Update_Categories = async (data, _id) => {
    return await instance.put(`/categories/${_id}`, data);
};
export const Remove_Categories = async (id) => {
    return await instance.delete(`/categories/${id}`);
};