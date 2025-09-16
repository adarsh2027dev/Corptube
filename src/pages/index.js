    import React from 'react';

    const HomePage = () => {
        return (
            <div className="relative w-full h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                
                {/* Blurred Background */}
                <div className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-50" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900?technology')" }}></div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
                
                {/* Content */}
                <div className="relative text-center text-white space-y-6">
                    <h1 className="text-5xl font-extrabold uppercase tracking-wide">Coming Soon 🚀</h1>
                    <p className="text-xl">We are building something awesome # <span className="font-semibold">CorpTube</span>.</p>
                    <p className="italic text-gray-300">Stay tuned and follow us for updates!</p>
                </div>
            </div>
        );
    };

    export default HomePage;
