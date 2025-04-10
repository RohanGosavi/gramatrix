import React, { useRef } from "react";
import { motion } from "framer-motion";

const GramatrixApp = () => {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-md w-full mx-auto mt-12">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Gramatrix Converter</h3>
      <button className="bg-pink-600 text-white w-full py-3 rounded-full mb-4 text-base">
        🎙️ Start Listening
      </button>
      <p className="text-gray-700 text-center">🫱 AI Output will appear here...</p>
    </div>
  );
};

const LandingPage = () => {
  const appRef = useRef(null);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-blue-600 text-white px-4 md:px-8 py-10 font-sans">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg mb-6">
          <span className="bg-white text-pink-600 px-4 py-1 rounded-xl shadow-md">Gramatrix</span>
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Bridging Voices. Empowering Hands.
        </h2>
        <p className="text-base md:text-lg mb-6 text-white/90">
          Instantly convert spoken English into Sign Language Grammar with AI.
        </p>
        <button
          onClick={scrollToApp}
          className="bg-white text-pink-600 px-6 py-3 rounded-full text-base font-semibold hover:bg-gray-200 transition w-full md:w-auto"
        >
          🔊 Try It Now
        </button>
        <p className="mt-4 text-sm text-white/70">
          🧠 Built with Glovatrix AI · 💬 Real-time · 🫱 Inclusive
        </p>
      </motion.div>

      {/* How It Works */}
      <section className="mt-16 max-w-4xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🎙️ Speak</h3>
            <p className="text-sm md:text-base">Click the mic and speak. The app listens to you in real-time.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🤖 Convert</h3>
            <p className="text-sm md:text-base">AI transforms your spoken sentence into Sign Language Grammar.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">📲 Read & Copy</h3>
            <p className="text-sm md:text-base">Get an instant, clean grammar output. Copy or share it easily.</p>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section ref={appRef}>
        <GramatrixApp />
      </section>

      {/* Why Gramatrix */}
      <section className="mt-20 max-w-3xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Gramatrix?</h2>
        <ul className="space-y-4 text-sm md:text-base">
          <li>✅ <strong>Accessible for All:</strong> Designed for all age groups</li>
          <li>⚡ <strong>Real-Time:</strong> Lightning-fast AI translation</li>
          <li>🌐 <strong>Powered by AI:</strong> Google Gemini under the hood</li>
          <li>📚 <strong>Educative:</strong> Learn structure of sign grammar</li>
          <li>🛠️ <strong>Impact-Driven:</strong> Great for schools, NGOs & more</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mt-20 px-2 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">❤️ Testimonials</h2>
        <div className="space-y-6 text-sm md:text-base">
          <blockquote className="bg-white/10 p-4 rounded-2xl">
            “My students can now understand live classroom speech better than ever before.”
            <footer className="mt-2 text-xs text-white/60">– Teacher, Deaf School in Pune</footer>
          </blockquote>
          <blockquote className="bg-white/10 p-4 rounded-2xl">
            “It helps me practice sign grammar and keeps me in the loop when friends speak.”
            <footer className="mt-2 text-xs text-white/60">– Rajesh, College Student (Deaf)</footer>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-white/60 text-xs">
        Made with ❤️ in India by{" "}
        <a href="https://tantrawave.com" className="underline hover:text-white">
          Tantrawave Technologies
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
