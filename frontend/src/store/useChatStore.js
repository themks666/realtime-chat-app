import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  allPartners: [],
  isLoading: false,
  isContactLoading: false,
  isFriendLoading: false,
  selectedUser: null,
  activeChat: "friends",
  messages: [],
  activeChatToggle: (mode) => {
    set({ activeChat: mode });
  },
  isMessageLoading: false,
  getAllContacts: async () => {
    try {
      set({ isContactLoading: true });
      const res = await axiosInstance.get("/messages/contacts");
      console.log(res);
      set({ allContacts: res.data.users });
    } catch (error) {
      set({ allContacts: [] });
      console.log(error);
    } finally {
      set({ isContactLoading: false });
    }
  },
  getAllPartners: async () => {
    try {
      set({ isFriendLoading: true });
      const res = await axiosInstance.get("/messages/chats");

      set({ allPartners: res.data.chatPartners });
    } catch (error) {
      set({ allPartners: [] });
      console.log(error);
    } finally {
      set({ isFriendLoading: false });
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
