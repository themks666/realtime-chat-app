import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,
  isLoggedIn: false,
  login: async (formData) => {
    set({ isLoggedIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log(res.data.user);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isLoggedIn: false });
    }
  },
  register: async (formData) => {
    try {
      console.log(formData);
      set({ isLoggedIn: true });
      const res = await axiosInstance.post("/auth/register", formData);
      console.log(res.data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isLoggedIn: false });
    }
  },
  logout: async () => {
    await axiosInstance.get("/auth/logout");
    set({ authUser: null });
  },
  isVerifying: true,
  verifyUser: async () => {
    try {
      console.log("Verifying...");
      const res = await axiosInstance.get("/auth/verify");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isVerifying: false });
    }
  },
}));
