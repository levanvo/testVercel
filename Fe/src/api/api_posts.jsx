import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:8080/`
});

export const All_Posts = async () => {
    return await instance.get(`/posts`);
};
export const One_Posts = async (id) => {
    return await instance.get(`/posts/${id}`);
};
export const Create_Posts = async (data) => {
    return await instance.post(`/posts`, data);
};
export const Update_Posts = async (data, _id) => {
    return await instance.put(`/posts/${_id}`, data);
};
export const Remove_Posts = async (id) => {
    return await instance.delete(`/posts/${id}`);
};