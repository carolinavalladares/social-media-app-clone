import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={5000} limit={1} position={"top-center"} />
    </AuthContextProvider>
  );
}
