"use client";

import { useState, useEffect, useCallback } from "react";
import { quotes, Quote } from "../constants/quotes";

export default function MotivationQuote() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [isVisible, setIsVisible] = useState(true);

  const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleNewQuote = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setCurrentQuote(newQuote);
      setIsVisible(true);
    }, 300);
  }, []);

  // Auto-refresh quote every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNewQuote();
    }, 30000);

    return () => clearInterval(interval);
  }, [handleNewQuote]);

  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 max-w-4xl mx-auto mb-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          💪 Daily Motivation
        </h3>

        <div
          className={`transition-all duration-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <blockquote className="text-lg text-gray-700 italic mb-3">
            &ldquo;{currentQuote.text}&rdquo;
          </blockquote>
          <cite className="text-sm text-gray-600 font-medium">
            — {currentQuote.author}
          </cite>
        </div>

        <button
          onClick={handleNewQuote}
          className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
        >
          🔄 New Quote
        </button>
      </div>
    </div>
  );
}
