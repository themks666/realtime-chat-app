import { create } from "zustand";
import { axisoInstance } from "../lib/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,
  isLoggedIn: false,
  login: () => {
    set({ isLoggedIn: true });
  },
  register: async (formData) => {
    try {
      set({ isLoggedIn: true });
      const res = await axisoInstance.post("/auth/register", formData);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isLoggedIn: false });
    }
  },
  logout: () => {},
  isVerifying: false,
  verifyUser: async () => {
    set({ isVerifying: true });
    try {
      const res = await axisoInstance.get("/auth/verify");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isVerifying: false });
    }
  },
}));
