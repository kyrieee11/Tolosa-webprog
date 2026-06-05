import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUsers = () => API.get("/");

export const createUser = (user) => API.post("/", user);

export const updateUser = (id, user) => API.put(`/${id}`, user);

export const deleteUser = (id) => API.delete(`/${id}`);

export const loginUser = (credentials) => API.post("/login", credentials);

export default {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};