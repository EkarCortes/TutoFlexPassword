import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-movil-ii-production.up.railway.app",
});

// Interceptor para manejo global de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;