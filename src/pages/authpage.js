import React, { useState } from "react";
function AuthPage() {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div
      className={` relative w-screen h-screen bg-black overflow-hidden flex justify-center items-center playfair-heading
         ${activeForm === "register" ? "active" : ""} 
        ${activeForm === "forget" ? "forget" : ""}`}
    >
      {/* Curved Background Shapes */}
      <div
        className="absolute right-0 -top-1 w-[1200px] h-[1200px] border-[3.5px] border-[#5827d4]"
        style={{
          background: "linear-gradient(45deg, #230a4a, #480e9f, #7c49c9)",
          transform:
            activeForm === "register" || activeForm === "forget"
              ? "rotate(0deg) skewY(0deg)"
              : "rotate(10deg) skewY(40deg)",
          transformOrigin: "bottom right",
          transition: "0.7s ease",
        }}
      ></div>

      <div
        className="absolute left-[680px] top-full w-[1200px] h-[1200px] border-t-[3.5px] border-[#5827d4] bg-black"
        style={{
          transform:
            activeForm === "register" || activeForm === "forget"
              ? "rotate(-11deg) skewY(-41deg)"
              : "rotate(0deg) skewY(0deg)",
          transformOrigin: "bottom left",
          transition: "0.7s ease",
        }}
      ></div>

      {/* ---------------- Login Section ---------------- */}
      <div
        className={`absolute top-0 left-0 w-2/5 h-full flex flex-col justify-center px-[70px] 
        ${activeForm !== "login" ? "hidden" : ""}`}
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-4">
          Login
        </h2>
        <form>
          {/* username */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="text"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Username
            </label>
            <img
              src="/assets/username_icon.png"
              alt="username"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px]"
            />
          </div>

          {/* password */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="password"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Password
            </label>
            <img
              src="/assets/lock_icon.png"
              alt="lock"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px]"
            />
          </div>

          {/* button */}
          <div className="mt-6">
            <button
              type="submit"
              className="relative w-full h-[45px] rounded-full border-2 border-[#401683] font-semibold overflow-hidden text-white"
            >
              <span className="absolute -top-full left-0 w-full h-[300%] bg-gradient-to-b from-[#7127E9] via-[#6B37BF] to-[#401683] transition-all duration-500 hover:top-0"></span>
              Login
            </button>
          </div>

          {/* links */}
          <div className="text-sm text-center mt-5">
            <p>
              <a
                href="#"
                onClick={() => setActiveForm("forget")}
                className="text-[#AA7EF5] font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </p>
            <p className="text-white mt-2">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                onClick={() => setActiveForm("register")}
                className="text-[#AA7EF5] font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* login info */}
      <div
        className={`absolute right-0 h-full w-1/2 flex flex-col justify-center text-right pr-[65px] pb-[300px] pl-[150px] ${
          activeForm !== "login" ? "hidden" : ""
        }`}
      >
        <h2 className="uppercase text-[80px] font-extrabold text-white leading-tight league-heading ">
          WELCOME <br /> BACK!
        </h2>
        <p className="text-lg max-w-[260px] ml-auto text-white">
          To India’s own social app{" "}
          <b className="text-[#AA7EF5]">Corptube</b>. For India By the Indians.
        </p>
      </div>

      {/* ---------------- Register Section ---------------- */}
      <div
        className={`absolute top-0 right-0 w-2/5 h-full flex flex-col justify-center px-[60px] ${
          activeForm !== "register" ? "hidden" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-4">
          Sign Up
        </h2>
        <form>
          {/* full name */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="text"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Full Name
            </label>
          </div>

          {/* username */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="text"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Username
            </label>
          </div>

          {/* category */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="text"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Category
            </label>
          </div>

          {/* password */}
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="password"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-8 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Password
            </label>
          </div>

          {/* button */}
          <div className="mt-6">
            <button
              type="submit"
              className="relative w-full h-[45px] rounded-full border-2 border-[#401683] font-semibold overflow-hidden text-white"
            >
              <span className="absolute -top-full left-0 w-full h-[300%] bg-gradient-to-b from-[#7127E9] via-[#6B37BF] to-[#401683] transition-all duration-500 hover:top-0"></span>
              Sign Up
            </button>
          </div>

          <div className="text-sm text-center mt-5 text-white">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => setActiveForm("login")}
                className="text-[#AA7EF5] font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* register info */}
      <div
        className={`absolute left-0 h-full w-1/2 flex flex-col justify-center text-left pl-[38px] pb-[60px] pr-[150px] ${
          activeForm !== "register" ? "hidden" : ""
        }`}
      >
        <h2 className="uppercase text-[80px] font-extrabold text-white leading-tight">
          WELCOME!
        </h2>
        <p className="text-lg max-w-[260px] text-white">
          We’re delighted to have you here. If you need any assistance, feel
          free to reach out.
        </p>
      </div>

      {/* ---------------- Forget Section ---------------- */}
      <div
        className={`absolute top-0 right-0 w-2/5 h-full flex flex-col justify-center px-[40px] ${
          activeForm !== "forget" ? "hidden" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-4">
          Forgot Password
        </h2>
        <form>
          <div className="relative w-full h-[50px] mt-6">
            <input
              type="email"
              required
              className="peer w-full h-full bg-transparent border-b-2 border-white focus:border-[#8e4eed] outline-none text-white font-medium pr-6 text-base"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-base transition-all peer-focus:-top-1 peer-focus:text-[#8e4eed]">
              Email
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="relative w-full h-[45px] rounded-full border-2 border-[#401683] font-semibold overflow-hidden text-white"
            >
              <span className="absolute -top-full left-0 w-full h-[300%] bg-gradient-to-b from-[#7127E9] via-[#6B37BF] to-[#401683] transition-all duration-500 hover:top-0"></span>
              Send OTP
            </button>
          </div>

          <div className="text-sm text-center mt-5">
            <p>
              <a
                href="#"
                onClick={() => setActiveForm("login")}
                className="text-[#AA7EF5] font-semibold hover:underline"
              >
                Back to Login
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* forget info */}
      <div
        className={`absolute right-0 h-full w-1/2 flex flex-col justify-center text-left px-[40px] ${
          activeForm !== "forget" ? "hidden" : ""
        }`}
      >
        <h2 className="uppercase text-[32px] font-bold text-white">
          Password Recovery
        </h2>
        <p className="text-lg max-w-[260px] text-white">
          Enter your email to receive OTP and reset your password.
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
