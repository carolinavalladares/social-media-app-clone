import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormDataType {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const { signIn } = useAuth();

  const submit: SubmitHandler<FormDataType> = (data: FormDataType) => {
    signIn(data);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit(submit)}
        className="shadow-md bg-white p-4 w-full max-w-xs"
      >
        <h3 className="font-semibold text-lg mb-4">Login</h3>
        <div className="flex flex-col mb-4 relative">
          <label htmlFor="email">Email: </label>
          <input
            {...register("email", { required: true })}
            className="border h-8 px-2"
            type="text"
            name="email"
          />
          {errors.email && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              email is required
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4 relative">
          <label htmlFor="password">Password:</label>
          <input
            {...register("password", { required: true })}
            className="border h-8 px-2"
            type="password"
            name="password"
          />
          {errors.password && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1">
              password is required
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-700 text-white w-full h-9 mt-5"
        >
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
