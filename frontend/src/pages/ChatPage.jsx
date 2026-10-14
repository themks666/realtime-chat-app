import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Send, Image, User, ArrowLeft } from "lucide-react";

import HomePage from "./LandingPage";

export default function ChatContainer() {
  const {
    messages,
    selectedUser,
    getAllMessagesById,
    sendMessage,
    allPartners,
    isMessageLoading,
  } = useChatStore();
  const { authUser, onlineUser } = useAuthStore();
  const [text, setText] = useState("");
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (selectedUser?._id) {
      getAllMessagesById(selectedUser._id);
    }
  }, [selectedUser?._id, getAllMessagesById]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await sendMessage(selectedUser._id, { text: text.trim() });
    setText("");
  };

  if (!selectedUser) return <HomePage />;

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700/50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedUser(null)}
            className="md:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative shrink-0">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                <User className="w-5 h-5" />
              </div>
            )}
            {onlineUser?.includes(selectedUser._id) ? (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-gray-800 rounded-full"></span>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white leading-tight">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-emerald-400 font-medium"> {onlineUser?.includes(selectedUser._id)?"Online": "offline"}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
        {isMessageLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No messages yet. Send a message to start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isSender = message.senderId === authUser?._id;
            return (
              <div
                key={message._id || Math.random()}
                className={`flex gap-3 ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] md:max-w-md px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    isSender
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700/50"
                  }`}
                >
                  <p className="wrap-break-word leading-relaxed">
                    {message.text}
                  </p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isSender ? "text-indigo-200" : "text-gray-400"
                    }`}
                  >
                    {new Date(
                      message.createdAt || Date.now(),
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="p-3 bg-gray-800 border-t border-gray-700/50 flex items-center gap-2"
      >
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-gray-700 transition"
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
