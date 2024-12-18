import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.4.177:17017",
//   headers: HeadersItem,
});

export default api;