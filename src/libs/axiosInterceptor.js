import axios from "axios";
import { jwtDecode } from "jwt-decode";

let token = '';
let expire = 0;

// Fetching refresh token
const fetchRefreshToken = async () => {
  try {
    const response = await axios.get("/api/auth/refreshtoken", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    });
    token = response.data.token;
    const decode = jwtDecode(token);
    expire = decode.exp;
    return token
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Membuat axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  }
})

// Membuat axios interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      try {
        token = await fetchRefreshToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)