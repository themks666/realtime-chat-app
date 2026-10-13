import { Search, SquarePen, PanelLeft, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"; 
import Friends from "../layout/Friends";
import Contact from "../layout/Contact";

export default function Sidebar() {
  const { logout } = useAuthStore();
  const { activeChat, activeChatToggle, selectedUser } = useChatStore(); 

  return (
    <aside 
      className={`
        w-full md:w-80 h-screen bg-gray-800 text-gray-100 p-4 flex flex-col font-sans select-none shrink-0 border-r border-gray-700/50
        ${selectedUser ? "hidden md:flex" : "flex"} 
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Messages
        </h1>
        <div className="flex items-center gap-3 text-gray-300">
          <button className="hover:text-white transition p-1">
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button className="hover:text-white transition p-1">
            <SquarePen className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button className="hover:text-white transition p-1">
            <PanelLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center items-center bg-gray-900 p-1 rounded-xl mb-4 gap-1">
        <button
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeChat === "friends"
              ? "bg-gray-700 text-white shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => activeChatToggle("friends")}
        >
          Friends
        </button>
        <button
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeChat === "contacts"
              ? "bg-gray-700 text-white shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => activeChatToggle("contacts")}
        >
          Contacts
        </button>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* List Area */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeChat === "friends" ? <Friends /> : <Contact />}
      </div>

      {/* Logout Footer */}
      <div className="pt-4 mt-auto border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-gray-700/50 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}