
import { getTokenAdmin } from "@/utils/auth.admin";
import axios from "axios";
import baseURL from "./baseUrl";

const apiAdmin = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenAdmin()}`,
  },
});

export default apiAdmin;
