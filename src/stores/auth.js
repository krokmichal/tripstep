import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getToken() {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    },
    async getUser() {
      this.getToken();
      const data = await axios.get("http://localhost:8000/api/user");
      this.authUser = data.data;
    },
    async onLogin(data) {
      await this.getToken();
      await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      this.router.push("/");
    },
    async handleRegister(data) {
      await this.getToken();
      await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      this.router.push("/");
    },
  },
});
