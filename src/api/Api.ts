import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import router from "@/router";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  source?: string;
}

const Api: AxiosInstance = axios.create({
  //baseURL: "http://181.224.251.62:8092/", // Svr Producción
  //baseURL: "http://181.224.251.56:8094/", // Svr Desarrollo
  baseURL: "https://localhost:7122/", // Mi maquina
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Extender el tipo InternalAxiosRequestConfig para incluir tu propiedad source
declare module "axios" {
  interface InternalAxiosRequestConfig<D = any> {
    source?: string;
  }
}

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      // Asegurar que headers existe y es del tipo correcto
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error("Sesión caducada. Redirigiendo al inicio de sesión.");

      //const loginComponent = localStorage.getItem("loginComponent");
      const varComponent: string = localStorage.getItem(
        "login"
      )|| "";

      router.push({ name: varComponent });
      localStorage.clear();
      sessionStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default Api;