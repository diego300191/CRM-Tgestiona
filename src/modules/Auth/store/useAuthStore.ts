import { defineStore } from "pinia";
import router from "../../../router";
import api from "@/api/Api";
import Swal from "sweetalert2";
import axios from "axios";

// Tipos para el estado
interface AuthState {
  firstname: string;
  rol: string;
  token: string;
  listOption: any[];
  isAuthenticated: boolean | string;
  refreshTokenTimeout: number;
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
  email: string;
  numeroDocumento: string;
  telefono: string;
  celular: string;
  direccion: string;
  foto: string;
  logo: string;
  listaAcciones: any[];
  usuario: string;
  idUsuario: number;
}

interface LoginResponse {
  dominioweb: string;
  esInterno: boolean;
  expiresIn: number;
  nombre: string;
  nombreCompleto: string;
  role: string;
  token: string;
  tokenApp: string;
  id: number;
  listOpciones: any[];
}

export const useAuthStore = defineStore("Auth", {
  state: (): AuthState => ({
    firstname: "",
    rol: "",
    token: "",
    listOption: [],
    isAuthenticated: false,
    refreshTokenTimeout: 0,
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    email: "",
    numeroDocumento: "",
    telefono: "",
    celular: "",
    direccion: "",
    foto: "",
    logo: "",
    listaAcciones: [],
    usuario: "",
    idUsuario: 0,
  }),
  persist: true,
  actions: {
    async login(login: string, password: string, codigoAcceso: string) {
      try {
        const response = await axios.post<LoginResponse>(
           process.env.VUE_APP_ENV === "development"
            ? process.env.VUE_APP_apiURLSeguridad_DESA
            : process.env.VUE_APP_apiURLSeguridad_PROD,
          {
          login,
          password,
          codigoAcceso,
        });
        const { data } = response;
        this.setData(data);
        this.setMenuOpciones(data.listOpciones);
        router.push({ path: "/" });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario y/o clave ingresados son incorrectos o no tiene permiso para ingresar al sistema.",
          footer: "<b>Favor de contactar con el Administrador del sistema.</b>",
        });
        console.error(e);
      }
    },

    logout() {
      const data = {
        nombreCompleto: null,
        role: null,
        token: null,
        isAuthenticated: false,
        idUsuario: null,
      };
      this.firstname = data.nombreCompleto || "";
      this.rol = data.role || "";
      this.token = data.token || "";
      this.isAuthenticated = false;
      this.idUsuario = data.idUsuario || 0;
      localStorage.clear();
      router.push({ path: "/login" });
    },

    setData(data: LoginResponse) {
      this.firstname = data.nombreCompleto;
      this.rol = data.role;
      this.token = data.token;
      this.isAuthenticated = true;
      this.idUsuario = data.id;

      localStorage.setItem("token", this.token);
      localStorage.setItem("role", this.rol);
      localStorage.setItem("NombreCompleto", this.firstname);
      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());
      localStorage.setItem("loginComponent", "login");
      localStorage.setItem("UsuarioId", this.idUsuario.toString());
    },

    setMenuOpciones(menu: any[]) {
      this.listOption = [];
      this.listOption.push(...menu);
      localStorage.setItem("MenuOpciones", JSON.stringify(menu));
    },

    setListaAcciones(lista: string) {
      this.listaAcciones = [];
      const listaParseJson = JSON.parse(lista);
      this.listaAcciones.push(listaParseJson);
    },

    startRefreshTokenTimer() {
      const jwtBase64 = this.token.split(".")[1];
      const jwtToken = JSON.parse(atob(jwtBase64));
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout) || 0;
    },

    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
      }
    },

    getLocalStorageItem() {
      this.firstname = localStorage.getItem("NombreCompleto") || "";
      this.rol = localStorage.getItem("role") || "";
      this.token = localStorage.getItem("token") || "";
      this.isAuthenticated = localStorage.getItem("isAuthenticated") || false;
      this.listOption = JSON.parse(
        localStorage.getItem("MenuOpciones") || "[]"
      );
      this.apellidopaterno = localStorage.getItem("apellidoPaterno") || "";
      this.idUsuario = Number(localStorage.getItem("UsuarioId")) || 0;
    },

    async getvalidarUserReminder(username: string) {
      const { data } = await api.get(`/NotificarOlvideContrasenia/${username}`);
      return data;
    },

    async getvalidarCodigoAccesReminder(username: string, codigo: string) {
      const { data } = await api.get(
        `/ValidarCodigoVerficacion/${username}/${codigo}`
      );
      return data;
    },

    async changePasswordUser(formUser: any) {
      const { data } = await api.post("/cambiarContrasenia", { ...formUser });
      return data;
    },

    async refreshToken() {
      // Implementar lógica para refrescar el token si es necesario
    },
  },
});
