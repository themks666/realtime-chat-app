import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";


const Contact = () => {
  const { allContacts, getAllContacts, setSelectedUser, isContactLoading } =
    useChatStore();
  const { onlineUser } = useAuthStore();
  useEffect(() => {
    const fetchContacts = async () => {
      await getAllContacts();
    };
    fetchContacts();
  }, [getAllContacts]);

  return (
    <div className="space-y-2">
      {isContactLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loader className="animate-spin" />
        </div>
      ) : allContacts.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-400">
          No Contacts found
        </div>
      ) : (
        allContacts.map((contact) => (
          <div
            onClick={() => setSelectedUser(contact)}
            key={contact._id}
            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-700 transition cursor-pointer"
          >
            <div className="relative shrink-0">
              {contact.profilePic ? (
                <img
                  src={contact.profilePic}
                  alt={contact.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                  <User className="w-5 h-5" />
                </div>
              )}
              {onlineUser?.includes(contact._id) ? (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-gray-800 rounded-full"></span>
              ) : (
                ""
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold truncate text-white">
                {contact.fullName}
              </h2>
              <p className="text-xs text-gray-400 truncate">{contact.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Contact;
