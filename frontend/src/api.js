import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5253/api",
});

export default API;
