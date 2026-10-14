import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { io } from "socket.io-client";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,
  onlineUser: null,
  isLoggedIn: false,
  socket: null,
  login: async (formData) => {
    set({ isLoggedIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log(res.data.user);
      set({ authUser: res.data.user });
      get().connectSocket()
    } catch (error) {
      console.log(error?.response?.data?.message);
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
      set({ authUser: res.data.user });
      get().connectSocket()
    } catch (error) {
      console.log(error?.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ isLoggedIn: false });
    }
  },
  logout: async () => {
    await axiosInstance.get("/auth/logout");
    set({ authUser: null });
    get().disconnectSocket()
  },
  isVerifying: true,
  verifyUser: async () => {
    try {
      console.log("Verifying...");
      const res = await axiosInstance.get("/auth/verify");
      set({ authUser: res.data.user });
      get().connectSocket()
    } catch (error) {
      console.log(error?.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ isVerifying: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    set({ socket });
    socket.on("get_online_users", (userIds) => {
      console.log(userIds);
      
      set({ onlineUser: userIds });
    });
  },
  disconnectSocket: () => {
   if(get().socket?.connected) get().socket.disconnect()
  },
}));
