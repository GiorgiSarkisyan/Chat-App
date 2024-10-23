import supabase from "./supabase";

export const signUp = async (username, email, password, file) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: username,
        avatar_url: null,
      },
    },
  });

  if (authError) {
    console.error("Authentication Error:", authError);
    return { data: null, error: authError };
  }

  const { user } = authData;

  let imageUrl;

  const fileName = `${user.id}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("File Upload Error:", uploadError);
    return { data: null, error: uploadError };
  }

  imageUrl = `https://lpdpgehlyfxfzuurxehh.supabase.co/storage/v1/object/public/avatars/${fileName}`;

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      name: username,
      avatar_url: imageUrl,
    },
  });

  if (updateError) {
    console.error("Error updating user metadata:", updateError);
    return { data: null, error: updateError };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        user_id: user.id,
        username: username,
        email: email,
        avatar_url: imageUrl,
      },
    ]);

  if (userError) {
    console.error("User Insert Error:", userError);
    return { data: null, error: userError };
  }

  return { data: userData, error: null };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error("Could not log in ");

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const fetchMessages = async () => {
  const { data, error } = await supabase.from("messages").select(`
    *,
    users:user_id (
      username,
      avatar_url
    )
  `);
  console.log(data);
  if (error) {
    throw error;
  }

  return data.map((msg) => ({
    ...msg,
    user_name: msg.users.user_name,
    avatar_url: msg.users.avatar_url,
  }));
};

export const sendMessage = async (created_at, user_id, content) => {
  const { data, error } = await supabase.from("messages").insert([
    {
      created_at,
      user_id,
      content,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
};
