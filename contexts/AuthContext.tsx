import { UserType, LoginType } from "@/types/types";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import Router from "next/router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface AuthProps {
  user: UserType;
  signIn: (data: LoginType) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthProps);

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState({} as UserType);

  useEffect(() => {
    const { "authTest.token": token } = parseCookies();

    if (token) {
      userInfoRequest(token);
    }
  }, []);

  async function userInfoRequest(token: string) {
    const reqInfo = await fetch(
      process.env.NEXT_PUBLIC_GET_USER_INFO_ENDPOINT as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = await reqInfo.json();

    setUser(user);
  }

  async function signIn(data: LoginType) {
    const login = await fetch(
      process.env.NEXT_PUBLIC_LOGIN_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resp = await login.json();

    setCookie(undefined, "authTest.token", resp.token, {
      maxAge: 60 * 60 * 1, //1 hour
    });

    setUser(resp.user);

    Router.push("/");
  }

  function signOut() {
    destroyCookie(undefined, "authTest.token");

    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
