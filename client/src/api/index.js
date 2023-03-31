import axios from "axios";
import { environment } from "../constants";

axios.defaults.baseURL = environment.api_url;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 90 * 1000; // Timeout is 90 seconds
axios.defaults.maxContentLength = 52428800; // 50 MB

let token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  refreshToken: () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};

export default http;
