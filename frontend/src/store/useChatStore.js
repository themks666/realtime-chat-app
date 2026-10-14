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
      console.log(error?.response?.data?.message);
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
      console.log(error?.response?.data?.message);
    } finally {
      set({ isFriendLoading: false });
    }
  },
  getAllMessagesById: async (partnersId) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/messages/${partnersId}`);

      set({ messages: res.data.messages });
    } catch (error) {
      set({ messages: [] });
      console.log(error?.response?.data?.message);
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
      console.log("successful");
      
      set({ messages: get().messages.concat(res.data.message) })
      console.log(res.data);
      ;
    } catch (error) {
      console.log(error);
      // console.log(error?.response?.data?.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
}));
