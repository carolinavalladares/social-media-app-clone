import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

interface FormDataType {
  email: string;
  password: string;
}

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as FormDataType);

  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="shadow-md bg-white p-4 w-full max-w-xs"
      >
        <h3 className="font-semibold text-lg mb-4">Login</h3>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email: </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border h-8 px-2"
            type="text"
            name="email"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="border h-8 px-2"
            type="password"
            name="password"
          />
        </div>

        <button type="submit" className="bg-slate-700 text-white w-full h-9">
          Entrar
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "authTest.token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
