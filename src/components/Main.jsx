import { BiSend } from "react-icons/bi";
import supabase from "../supabase/supabase";
import { useContext, useEffect, useState } from "react";
import { sendMessage, fetchMessages } from "../supabase/actions";
import { UserContext } from "../context/UserContext";
import Spinner from "./Spinner";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!", payload);
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [data] = useContext(UserContext);
  let liveData;

  if (!data) {
    return;
  } else {
    liveData = data;
  }

  const { user } = liveData;

  console.log(user);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const created_at = new Date().toISOString();
    const user_id = user.id;
    const user_name = user.user_metadata.name;
    const avatar_url = user.user_metadata.avatar_url;

    try {
      await sendMessage(created_at, user_id, user_name, avatar_url, inputValue);
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <main className="p-20 w-full flex flex-col h-full">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-white font-inter mb-6 overflow-auto flex-1 max-h-[1164px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`w-full flex gap-3 mb-6 items-end`}>
                <div className="w-16 h-16 bg-slate-800 rounded-full">
                  <img
                    src={msg.avatar_url}
                    alt="User Avatar"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-300 font-inter text-sm mb-1 pl-3">
                    {msg.user_name}
                  </span>
                  <div className="p-4 text-white rounded-full font-inter text-2xl bg-[#1e1e24] text-left">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="mt-auto w-full h-20 rounded-[40px] bg-[#40414E] p-6 flex">
            <input
              type="text"
              className="bg-[#40414E] focus:outline-none text-xl font-inter font-medium text-gray-400 w-full"
              placeholder="Type something"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <span
              className="ml-auto flex items-center cursor-pointer"
              onClick={handleSendMessage}
            >
              <BiSend className="w-10 h-10 text-[#343541] transition-all duration-300 hover:text-[#24242c]" />
            </span>
          </div>
        </>
      )}
    </main>
  );
}
