
import { getToken } from "@/utils/auth";
import axios from "axios";
import baseURL from "./baseUrl";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default api;
