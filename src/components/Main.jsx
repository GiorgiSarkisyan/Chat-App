/* eslint-disable react/prop-types */
import { BiSend } from "react-icons/bi";
import supabase from "../supabase/supabase";
import { useEffect, useRef, useState } from "react";
import { sendMessage, fetchMessages } from "../supabase/actions";
import Spinner from "./Spinner";
import { formatDate } from "../handlers/handlers";

export default function Main({ data }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const messageUserRef = useRef();

  const scrollToBottom = () => {
    messageUserRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
          loadMessages();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [messages]);

  const user = data.user;

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const created_at = new Date().toISOString();
    const user_id = user.id;

    try {
      await sendMessage(created_at, user_id, inputValue);
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
          <div className="text-white font-inter mb-6 overflow-auto flex flex-col gap-1 max-h-[1164px]">
            {messages.map((msg, index) => {
              const nextMsg = messages[index + 1];
              const isLastMessageOfUser =
                !nextMsg ||
                nextMsg.users.id !== msg.users.id ||
                new Date(nextMsg.created_at) - new Date(msg.created_at) >
                  2 * 60 * 1000;

              const previousMsg = messages[index - 1];
              const showDetails =
                !previousMsg ||
                msg.users.id !== previousMsg.users.id ||
                new Date(msg.created_at) - new Date(previousMsg.created_at) >
                  2 * 60 * 1000;

              const messageStyle = isLastMessageOfUser ? "mb-6" : "";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 ${messageStyle}`}
                >
                  {showDetails ? (
                    <div className="w-12 h-12">
                      <img
                        src={msg.users.avatar_url}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12" />
                  )}
                  <div className="flex flex-col">
                    {showDetails && (
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-semibold text-xl">
                          {msg.users.username}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {formatDate(msg.created_at)}
                        </span>
                      </div>
                    )}
                    <div className="text-white text-lg">{msg.content}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messageUserRef} />
          </div>

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
