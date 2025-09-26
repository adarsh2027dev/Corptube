import "./styles/globals.css";  // make sure this path is correct
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
