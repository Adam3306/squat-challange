"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  challengeStartDate: Date;
  challengeEndDate: Date;
}

export default function CountdownTimer({
  challengeStartDate,
  challengeEndDate,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);
  const [nextSessionTime, setNextSessionTime] = useState<Date | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();

      // Check if challenge has started
      if (now >= challengeStartDate.getTime()) {
        setIsChallengeStarted(true);

        // Check if challenge has ended
        if (now >= challengeEndDate.getTime()) {
          setIsExpired(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        // Calculate time until next session (every 4 hours)
        const sessionInterval = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
        const timeSinceStart = now - challengeStartDate.getTime();
        const sessionsPassed = Math.floor(timeSinceStart / sessionInterval);
        const nextSession = new Date(
          challengeStartDate.getTime() + (sessionsPassed + 1) * sessionInterval
        );

        // If next session is beyond challenge end, show time until challenge end
        const targetTime =
          nextSession.getTime() > challengeEndDate.getTime()
            ? challengeEndDate.getTime()
            : nextSession.getTime();
        setNextSessionTime(new Date(targetTime));

        const difference = targetTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          return { days, hours, minutes, seconds };
        } else {
          setIsExpired(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      } else {
        // Challenge hasn't started yet - countdown to start
        setIsChallengeStarted(false);
        const difference = challengeStartDate.getTime() - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          return { days, hours, minutes, seconds };
        } else {
          setIsChallengeStarted(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return (
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          Challenge Complete! 🎉
        </h2>
        <p className="text-lg text-gray-600">
          Congratulations on finishing the 48-hour squat challenge!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isChallengeStarted ? "Next Training Session" : "Challenge Countdown"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm uppercase tracking-wide">Days</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm uppercase tracking-wide">Hours</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm uppercase tracking-wide">Minutes</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm uppercase tracking-wide">Seconds</div>
        </div>
      </div>
      <p className="text-gray-600 mt-4">
        {isChallengeStarted &&
          `Next training session${
            nextSessionTime ? ` at ${nextSessionTime.toLocaleTimeString()}` : ""
          }: ${timeLeft.hours > 0 ? `${timeLeft.hours}h ` : ""}${
            timeLeft.minutes
          }m ${timeLeft.seconds}s`}
      </p>
    </div>
  );
}
