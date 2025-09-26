import "./styles/globals.css";  // make sure this path is correct
import React from "react";
<<<<<<< HEAD

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
=======
// import { Provider } from "react-redux";
// import { SessionProvider } from "next-auth/react";
import authpage from './authpage';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <>
    
        <Component {...pageProps} />
        <authpage/>
    </>

    // </SessionProvider>
  );
>>>>>>> 955ee248b356e19c552a8d69de45b6a7ec99a3f9
}

export default MyApp;
