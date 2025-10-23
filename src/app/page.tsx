import CountdownTimer from "./components/CountdownTimer";
import SquatCalculator from "./components/SquatCalculator";
import WorkoutTracker from "./components/WorkoutTracker";
import MotivationQuote from "./components/MotivationQuote";

export default function Home() {
  // Challenge starts on October 24th at 12:00 CET (Hungary timezone)
  // Set to 2025 since we're currently in 2025
  const challengeStartDate = new Date("2025-10-24T12:00:00"); // October 24th, 12:00 CET
  const challengeEndDate = new Date("2025-10-26T11:00:00"); // October 26th, 11:00 CET

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            💪 48-Hour Squat Challenge
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Challenge starts: October 24th, 12:00 CET (Hungary)
          </p>
          <p className="text-lg text-gray-500 mb-4">
            Target: 6,437.5 kg per workout session (every 4 hours)
          </p>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-lg font-semibold text-gray-700">
              🏆 Coach: Susa Dávid
            </p>
            <p className="text-sm text-gray-600">
              Your fitness guide for this intense challenge
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <CountdownTimer
            challengeStartDate={challengeStartDate}
            challengeEndDate={challengeEndDate}
          />
        </div>

        {/* Motivation Quote */}
        <div className="mb-8">
          <MotivationQuote />
        </div>

        {/* Squat Calculator */}
        <div className="mb-8">
          <SquatCalculator />
        </div>

        {/* Workout Tracker */}
        <div className="mb-8">
          <WorkoutTracker />
        </div>

        {/* Challenge Rules */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Challenge Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">📅 Schedule</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Workout every 4 hours</li>
                <li>• 12 total sessions in 47 hours</li>
                <li>• Start: Oct 24, 12:00 CET</li>
                <li>• End: Oct 26, 11:00 CET</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                🏋️ Requirements
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• 6,437.5 kg total per session</li>
                <li>• Any squat variation allowed</li>
                <li>• Weight × Reps = 6,437.5 kg</li>
                <li>• Track your progress!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>
            Good luck with your challenge! Stay hydrated and listen to your
            body. 💪
          </p>
        </div>
      </div>
    </div>
  );
}
