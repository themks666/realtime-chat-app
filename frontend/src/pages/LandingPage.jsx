import { useChatStore } from "../store/useChatStore";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-900">
        {selectedUser ? (
          <div className="flex-1 flex items-center justify-center bg-gray-950">
            <p className="text-gray-400">Chat window for {selectedUser.fullName}</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-900">
            <div className="max-w-md space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Welcome to Messages
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Select a conversation from your friends or contacts list on the sidebar to start chatting, sharing updates, and staying connected.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}