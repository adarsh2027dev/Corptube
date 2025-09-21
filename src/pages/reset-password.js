import React, { useState } from "react";
import { useRouter } from "next/router";
import { resetPasswordSchema } from "../lib/zodSchemas/userSchema";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate form data with Zod
      const validatedData = resetPasswordSchema.parse(formData);

      const response = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/authpage');
        }, 3000);
      } else {
        setError(result.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        setError(error.errors[0].message);
      } else {
        console.error('Password reset error:', error);
        setError('Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen w-full bg-black overflow-hidden flex justify-center items-center">
        <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-[#230a4a] via-[#480e9f] to-[#7c49c9] opacity-20"></div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h1>
            <p className="text-gray-300 mb-6">
              Your password has been reset successfully. You will be redirected to the login page shortly.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#8e4eed] to-[#5827d4] h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex justify-center items-center">
      {/* Background */}
      <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-[#230a4a] via-[#480e9f] to-[#7c49c9] opacity-20"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-300 text-sm">
              Enter your new password below. Make sure it's secure and easy to remember.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-white/40 rounded-lg text-white focus:border-[#8e4eed] focus:ring-2 focus:ring-[#8e4eed]/50 outline-none transition"
                placeholder="Enter new password"
                required
              />
              <p className="text-xs text-gray-400">Password must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-white text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-transparent border-2 border-white/40 rounded-lg text-white focus:border-[#8e4eed] focus:ring-2 focus:ring-[#8e4eed]/50 outline-none transition"
                placeholder="Confirm new password"
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
              disabled={isLoading}
              className="w-full h-12 rounded-full border-2 border-[#401683] font-semibold text-white bg-gradient-to-r from-[#7127E9] to-[#401683] hover:from-[#8e4eed] hover:to-[#5827d4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/authpage')}
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

export default ResetPasswordPage;
