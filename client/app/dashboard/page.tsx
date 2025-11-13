"use client";


import { useAuth } from "@/providers/authentication";
import React from "react";

const DashboardPage = () => {
  const { user, state, login, register, logout, error, loginWithGoogle } =
    useAuth();

  return (
    <>
      <div>DashboardPage</div>
      
      {state === "authenticated" && (
        <div className="w-fit p-2 border border-black" onClick={logout}>
          logout{" "}
        </div>
      )}
      <pre>{JSON.stringify(user)}</pre>
    </>
  );
};

export default DashboardPage;
