"use client";
import React from "react";
import WagmiProvider from "./WagmiProvider";
import { ToastContainer } from "react-toastify";

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider>
      {children}
      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </WagmiProvider>
  );
};

export default Providers;
