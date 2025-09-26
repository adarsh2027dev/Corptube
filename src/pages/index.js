// pages/index.js
import React from "react";
import AuthPage from "./authpage"; 
const HomePage = () => {
  return (
    <div className="">
      {/* Blurred Background */}
    

      {/* ✅ Testing AuthPage below */}
      <div className="absolute bottom-10">
        <AuthPage />
      </div>
    </div>
  );
};

export default HomePage;
