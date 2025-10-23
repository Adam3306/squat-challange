"use client";

import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

const motivationQuotes: Quote[] = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
  },
  {
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Unknown",
  },
  {
    text: "Success isn't always about greatness. It's about consistency.",
    author: "Dwayne Johnson",
  },
  {
    text: "Your body can do it. It's your mind that you have to convince.",
    author: "Unknown",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Don't wish for it, work for it.",
    author: "Unknown",
  },
  {
    text: "Every champion was once a contender who refused to give up.",
    author: "Rocky Balboa",
  },
  {
    text: "The difference between the impossible and the possible lies in a person's determination.",
    author: "Tommy Lasorda",
  },
  {
    text: "You don't have to be great to get started, but you have to get started to be great.",
    author: "Les Brown",
  },
  {
    text: "The body achieves what the mind believes.",
    author: "Unknown",
  },
  {
    text: "Champions aren't made in gyms. Champions are made from something they have deep inside them.",
    author: "Muhammad Ali",
  },
  {
    text: "It's not about perfect. It's about effort.",
    author: "Jillian Michaels",
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "Push yourself because no one else is going to do it for you.",
    author: "Unknown",
  },
  {
    text: "The pain of discipline weighs ounces, the pain of regret weighs tons.",
    author: "Unknown",
  },
  {
    text: "You are stronger than you think you are.",
    author: "Unknown",
  },
  {
    text: "The moment you give up is the moment you let someone else win.",
    author: "Kobe Bryant",
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "6,437.5 kg per session? Challenge accepted!",
    author: "You",
  },
  {
    text: "Every squat is a step closer to victory.",
    author: "Unknown",
  },
  {
    text: "48 hours of pain, a lifetime of pride.",
    author: "Unknown",
  },
  {
    text: "The squat doesn't care about your excuses.",
    author: "Unknown",
  },
];

export default function MotivationQuote() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(motivationQuotes[0]);
  const [isVisible, setIsVisible] = useState(true);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
    return motivationQuotes[randomIndex];
  };

  const handleNewQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setCurrentQuote(newQuote);
      setIsVisible(true);
    }, 300);
  };

  // Auto-refresh quote every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNewQuote();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
            "{currentQuote.text}"
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

        <p className="text-xs text-gray-500 mt-2">
          Quote refreshes automatically every 30 seconds
        </p>
      </div>
    </div>
  );
}
