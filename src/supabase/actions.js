import supabase from "./supabase";

export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error caught while signing in with Google:", error);
    throw new Error(error.message || "Unknown error occurred");
  }

  if (!data) throw new Error("No data received");

  return { data, error };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const fetchMessages = async () => {
  let { data: messages, error } = await supabase.from("messages").select("*");

  if (!messages) throw new Error("No messages fetched");

  if (error) throw new Error("Could not fetch messages");

  return messages;
};

export const sendMessage = async (
  created_at,
  sender_id,
  user_name,
  avatar_url,
  content
) => {
  const { data, error } = await supabase.from("messages").insert([
    {
      created_at,
      content,
      user_id: sender_id,
      user_name: user_name,
      avatar_url: avatar_url,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
};
