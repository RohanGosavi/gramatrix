import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicrophone, FaRedo, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
  );
};

const App = () => {
  const [spokenText, setSpokenText] = useState('');
  const [signLang, setSignLang] = useState('');
  const [videos, setVideos] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  useEffect(() => {
    if (videos.length > 0) {
      setCurrentVideoIndex(0);
    }
  }, [videos]);

  const startListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript;
      setSpokenText(speechText);
      await convertToSignLanguageGrammar(speechText);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setListening(false);
    };
  };

  const convertToSignLanguageGrammar = async (text) => {
    setLoading(true);
    setVideos([]);
    setCurrentVideoIndex(0);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAXSNRfT3-2cIUmIAjtmb17PIpYvJJhNgw',
        {
          contents: [
            {
              parts: [
                {
                  text: `Convert the following English sentence into Sign Language Grammar. Output only the sentence in Sign Language Grammar, without any emojis or additional text.\n\nInput: "${text}"\nOutput:`,
                },
              ],
            },
          ],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const result = response.data.candidates[0].content.parts[0].text;
      const cleanedResult = result.split('**')[1] || result;
      setSignLang(cleanedResult.trim().toLowerCase());



      const grammarWords = cleanedResult.trim().toLowerCase().split(' ');
      const videoList = grammarWords.map((word) => getVideoForGesture(word));

      if (videoList.length > 0) {
        setVideos(videoList);
      }

      setHistory((prev) => [...prev, { spoken: text, sign: cleanedResult.trim() }]);
    } catch (err) {
      console.error(err);
      alert('Translation failed. Check your Gemini API key.');
    }
    setLoading(false);
  };

  const sanitizeWord = (word) => {
    return word.replace(/[.,?!]/g, '').toLowerCase();
  };

  const getVideoForGesture = (gestureName) => {
    const sanitizedWord = sanitizeWord(gestureName);
    const videoPath = `/videos/${sanitizedWord}.mp4`;
    console.log("Video Path:", videoPath); // Add this to log the generated video path
    return videoPath;
  };

  const resetAll = () => {
    setSpokenText('');
    setSignLang('');
    setCopied(false);
    setHistory([]);
    setVideos([]);
    setCurrentVideoIndex(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(signLang);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVideoEnd = () => {
    if (currentVideoIndex === videos.length - 1) {
      setCurrentVideoIndex(0); 
    } else {
      setCurrentVideoIndex((prev) => prev + 1);
    }
  };

  const replaySequence = () => {
    setCurrentVideoIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7268B] to-[#3B82F6] text-white px-6 py-10 flex flex-col items-center font-sans transition-all">
      <motion.img
        src="/logo.svg"
        alt="Gramatrix Logo"
        className="w-32 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-4 text-center tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🧠 Welcome to <span className="text-yellow-300">Gramatrix</span>
      </motion.h1>

      <motion.p
        className="text-lg mb-8 text-center max-w-2xl text-white/80"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Transform spoken English into structured Sign Language Grammar using cutting-edge AI from Glovatrix.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4 mb-10 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold shadow-2xl transition-transform transform hover:scale-105 ${listening ? 'bg-red-600' : 'bg-white text-[#D7268B] hover:bg-gray-100'}`}
          onClick={startListening}
          disabled={listening || loading}
        >
          {loading ? <Spinner /> : <FaMicrophone />}
          {listening ? 'Listening...' : loading ? '' : 'Speak'}
        </button>

        <button
          className="flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold bg-white text-gray-700 hover:bg-gray-100 shadow-2xl hover:scale-105 transition-transform"
          onClick={resetAll}
          disabled={loading || listening}
        >
          <FaRedo /> Reset
        </button>
      </motion.div>

      {spokenText && (
        <motion.div
          className="w-full max-w-3xl bg-white/20 backdrop-blur-md text-white p-6 rounded-3xl shadow-lg mb-6 border border-white/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-bold text-lg mb-2 text-white/80">They test Said:</h2>
          <p className="text-base leading-relaxed">{spokenText}</p>
        </motion.div>
      )}

      {signLang && (
        <motion.div
          className="w-full max-w-3xl bg-gradient-to-r from-white to-slate-100 text-gray-900 p-8 rounded-3xl shadow-2xl relative border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bold text-xl mb-4 text-slate-800">Sign Language Grammar:</h2>
          <p className="text-lg font-medium leading-relaxed text-slate-900">{signLang}</p>

          <button
            onClick={handleCopy}
            className="absolute top-6 right-6 text-sm text-indigo-700 hover:underline flex items-center"
          >
            <FaCopy className="inline mr-1" /> {copied ? 'Copied!' : 'Copy'}
          </button>

          {videos.length > 0 && (
            <div className="mt-8">
              <div className="relative w-full h-auto mb-8">
                <video
                  key={currentVideoIndex}
                  loop={false}
                  muted
                  autoPlay
                  className="w-[75%] h-auto rounded-lg shadow-md"
                  onEnded={handleVideoEnd}
                >
                  <source src={videos[currentVideoIndex]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

        </motion.div>
      )}

      <p className="text-sm text-white/70 mt-8">Made with ❤️ in India by <a href="https://tantrawave.com" target="_blank" rel="noopener noreferrer" className="font-semibold">Tantrawave Technologies</a></p>
    </div>
  );
};

export default App;
