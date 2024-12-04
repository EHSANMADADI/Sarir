import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.4.133:5155",
//   headers: HeadersItem,
});

export default api;