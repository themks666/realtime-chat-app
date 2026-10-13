import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader, User } from "lucide-react";

const Friends = () => {
  const { allPartners, getAllPartners, setSelectedUser, isFriendLoading } =
    useChatStore();

  useEffect(() => {
    const fetchPartners = async () => {
      await getAllPartners();
    };
    fetchPartners();
  }, [getAllPartners]);

  return (
    <div className="space-y-2">
      {isFriendLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loader className="animate-spin"></Loader>
        </div>
      ) : (
        <div>
          {allPartners.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">
              No Friends found
            </p>
          ) : (
            allPartners.map((partner) => (
              <div
                key={partner._id}
                onClick={() => setSelectedUser(partner)}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-700 transition cursor-pointer"
              >
                <div className="relative shrink-0">
                  {partner.profilePic ? (
                    <img
                      src={partner.profilePic}
                      alt={partner.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-gray-800 rounded-full"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold truncate text-white">
                    {partner.fullName}
                  </h2>
                  <p className="text-xs text-gray-400 truncate">
                    {partner.email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;
