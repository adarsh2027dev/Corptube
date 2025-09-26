import React from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored tokens/session data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/authpage');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Corptube Dashboard</h1>
              <p className="text-gray-300 text-sm">Welcome to your dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-[#7127E9] to-[#401683] text-white rounded-lg hover:from-[#8e4eed] hover:to-[#5827d4] transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-br from-[#230a4a] to-[#480e9f] rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-2">Welcome to Corptube!</h2>
            <p className="text-gray-300 text-sm">
              You have successfully logged in. This is your main dashboard where you can access all features.
            </p>
          </div>

          {/* Features Card */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                Update Profile
              </button>
              <button className="w-full text-left px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                Help & Support
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Account Type:</span>
                <span className="text-[#8e4eed] text-sm font-medium">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Member Since:</span>
                <span className="text-white text-sm">Today</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Status:</span>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Authentication Successful!</h3>
              <p className="text-gray-300 text-sm">
                You have successfully completed the authentication process and are now logged into Corptube.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
