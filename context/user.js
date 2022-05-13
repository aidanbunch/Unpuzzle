import { useRouter } from "next/router";
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabaseClient";

const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  //   async function loginWithEmail(mail, pass) {
  //     console.log("WORKING");
  //     const { error } = await supabase.auth.signIn({
  //       email: mail,
  //       password: pass,
  //     });
  //     console.log(error);

  //     // if (!error) {
  //     //   addToast(true);
  //     //   Router.push("/");
  //     // } else {
  //     //   addToast(false, error.message);
  //     // }
  //     return error;
  //   }
  const loginWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };

  const loginWithApple = async () => {
    await supabase.auth.signIn({
      provider: "apple",
    });
  };

  const loginWithGithub = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const loginWithDiscord = async () => {
    await supabase.auth.signIn({
      provider: "discord",
    })
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    logout,
    loginWithApple,
    loginWithGoogle,
    loginWithGithub,
    loginWithDiscord,
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
