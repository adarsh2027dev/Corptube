"use client";
import './styles/globals.css'
import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import authpage from './authpage';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
        <Component {...pageProps} />
        <authpage/>
    </SessionProvider>
  );
}

export default MyApp;
