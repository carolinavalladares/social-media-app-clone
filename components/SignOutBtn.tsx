import React from "react";
import useAuth from "@/hooks/useAuth";

const SignOutBtn = () => {
  const { signOut } = useAuth();
  return (
    <button
      className={`bg-slate-700 text-white text-sm font-semibold px-2 py-1`}
      onClick={signOut}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
