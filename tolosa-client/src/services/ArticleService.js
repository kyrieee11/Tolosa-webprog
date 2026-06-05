import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchArticles = () => API.get("/");

export const createArticle = (article) => API.post("/", article);

export const updateArticle = (id, article) => API.put(`/${id}`, article);

export const deleteArticle = (id) => API.delete(`/${id}`);

export default {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};