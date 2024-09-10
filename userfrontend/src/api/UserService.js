import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

export const createUser = (user) => axios.post(API_BASE_URL, user);

export const getAllUsers = () => axios.get(API_BASE_URL);

export const getUser = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/${id}`);
