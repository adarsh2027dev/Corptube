import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { otpSchema } from "../lib/zodSchemas/userSchema";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // must get from query or localStorage
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Get email from query or storage
  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    } else {
      const storedEmail = localStorage.getItem("pendingEmail");
      if (storedEmail) setEmail(storedEmail);
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate email + OTP only
      const validatedData = otpSchema.parse({ email, otp });

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (result.success) {
        // Clear stored email
        localStorage.removeItem("pendingEmail");
        // Redirect to dashboard or login page
        router.push("/dashboard");
      } else {
        setError(result.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        console.error("OTP verification error:", err);
        setError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.success) {
        alert("OTP sent successfully!");
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex justify-center items-center">
      <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-[#230a4a] via-[#480e9f] to-[#7c49c9] opacity-20"></div>
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Account</h1>
            <p className="text-gray-300 text-sm">
              We've sent a 6-digit OTP to your email address. Please enter it below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full h-12 px-4 bg-transparent border-2 border-white/40 rounded-lg text-white text-center text-xl font-bold tracking-widest focus:border-[#8e4eed] focus:ring-2 focus:ring-[#8e4eed]/50 outline-none transition"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full h-12 rounded-full border-2 border-[#401683] font-semibold text-white bg-gradient-to-r from-[#7127E9] to-[#401683] hover:from-[#8e4eed] hover:to-[#5827d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Didn't receive the OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-[#AA7EF5] font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/authpage")}
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
