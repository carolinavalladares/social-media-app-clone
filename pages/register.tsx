import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface FormDataType {
  displayName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const submit: SubmitHandler<FormDataType> = (data: FormDataType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      const values = {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
        password: data.password,
      };

      signUp(values);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col bg-white shadow-md p-4 w-full max-w-sm"
      >
        <h3 className="text-lg font-semibold mb-4 ">Register</h3>

        <div className="flex flex-col mb-4 relative">
          <label className="mb-2 text-sm" htmlFor="displayName">
            Display name:{" "}
          </label>
          <input
            className={`border px-2 h-10 text-lg ${
              errors.displayName && "border-rose-500"
            }`}
            type="text"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              display name is required
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4 relative">
          <label className="mb-2 text-sm" htmlFor="username">
            Username:{" "}
          </label>
          <input
            className={`border px-2 h-10 text-lg ${
              errors.username && "border-rose-500"
            }`}
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              username is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 relative">
          <label className="mb-2 text-sm" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className={`border px-2 h-10 text-lg ${
              errors.email && "border-rose-500"
            }`}
            type="email"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              email name is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 relative">
          <label className="mb-2 text-sm" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className={`border px-2 h-10 text-lg ${
              errors.password && "border-rose-500"
            }`}
            type="password"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              password name is required
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4 relative">
          <label className="mb-2 text-sm" htmlFor="confirmPassword">
            Confirm Password:{" "}
          </label>
          <input
            className={`border px-2 h-10 text-lg ${
              errors.confirmPassword && "border-rose-500"
            }`}
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose-500 font-bold absolute top-full left-1 ">
              please confirm password
            </p>
          )}
        </div>
        <button className="h-10 bg-slate-700 text-white text-lg mt-3">
          Register
        </button>

        <p className="text-sm text-slate-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="inline-block ml-1 text-slate-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
