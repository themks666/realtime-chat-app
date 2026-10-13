import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  allPartners: [],
  isLoading: false,
  selectedUser: null,
  activeChat: "friends",
  messages: [],
  activeChatToggle: (mode) => {
    set({activeChat:mode})
  },
  isMessageLoading: false,
  getAllContacts: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/messages/contacts");
      console.log(res);
      set({ allContacts: res.data.users });
    } catch (error) {
      set({ allContacts: [] });
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getAllPartners: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/messages/chats");
      console.log(res);

      set({ allPartners: res.data.chatPartners });
    } catch (error) {
      set({ allPartners: [] });
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getAllMessagesById: async (partnersId) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/messages/${partnersId}`);
      console.log(res);
      set({ messages: res.data.messages });
    } catch (error) {
      set({ messages: [] });
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
  sendMessage: async (partnersId, messageData) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.post(
        `/messages/send/${partnersId}`,
        messageData,
      );
      console.log(res);
      set({ messages: res.data.messages });
    } catch (error) {
      set({ messages: [] });
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
}));
