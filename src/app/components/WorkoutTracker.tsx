"use client";

import { useState, useEffect } from "react";

interface WorkoutSession {
  id: number;
  timestamp: Date;
  weight: number;
  reps: number;
  totalWeight: number;
  completed: boolean;
}

export default function WorkoutTracker() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [nextSessionTime, setNextSessionTime] = useState<Date | null>(null);
  const [editingSession, setEditingSession] = useState<number | null>(null);
  const [tempWeight, setTempWeight] = useState<number>(0);
  const [tempReps, setTempReps] = useState<number>(0);

  // Initialize sessions for 48-hour challenge (12 sessions every 4 hours)
  useEffect(() => {
    const challengeStart = new Date("2025-10-24T12:00:00"); // October 24th, 12:00 CET
    const now = new Date();

    // Try to load saved sessions from localStorage
    const savedSessions = localStorage.getItem("squat-challenge-sessions");

    let initialSessions: WorkoutSession[] = [];

    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        // Validate that we have the right number of sessions
        if (Array.isArray(parsedSessions) && parsedSessions.length === 12) {
          // Convert timestamp strings back to Date objects
          initialSessions = parsedSessions.map((session) => ({
            ...session,
            timestamp: new Date(session.timestamp),
          }));
        }
      } catch (error) {
        console.error("Error parsing saved sessions:", error);
      }
    }

    // If no saved sessions or invalid data, create default sessions
    if (initialSessions.length === 0) {
      for (let i = 0; i < 12; i++) {
        const sessionTime = new Date(
          challengeStart.getTime() + i * 4 * 60 * 60 * 1000
        );
        initialSessions.push({
          id: i + 1,
          timestamp: sessionTime,
          weight: 0,
          reps: 0,
          totalWeight: 0,
          completed: false,
        });
      }
    }

    // Find next session
    const nextSession = initialSessions.find(
      (session) => session.timestamp > now
    );

    // Use setTimeout to avoid synchronous setState in useEffect
    setTimeout(() => {
      setSessions(initialSessions);
      if (nextSession) {
        setNextSessionTime(nextSession.timestamp);
      }
    }, 0);
  }, []);

  const saveSessionsToStorage = (sessionsToSave: WorkoutSession[]) => {
    try {
      localStorage.setItem(
        "squat-challenge-sessions",
        JSON.stringify(sessionsToSave)
      );
    } catch (error) {
      console.error("Error saving sessions to localStorage:", error);
    }
  };

  const updateSession = (sessionId: number, weight: number, reps: number) => {
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              weight,
              reps,
              totalWeight: weight * reps,
              completed: true,
            }
          : session
      );

      // Save to localStorage
      saveSessionsToStorage(updatedSessions);

      return updatedSessions;
    });

    setEditingSession(null);
    setTempWeight(0);
    setTempReps(0);
  };

  const startEditing = (sessionId: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setEditingSession(sessionId);
      setTempWeight(session.weight || 0);
      setTempReps(session.reps || 0);
    }
  };

  const clearEditing = () => {
    setTempWeight(0);
    setTempReps(0);
  };

  const saveSession = () => {
    if (editingSession && tempWeight > 0 && tempReps > 0) {
      updateSession(editingSession, tempWeight, tempReps);
    }
  };

  const getSessionStatus = (session: WorkoutSession) => {
    const now = new Date();
    if (session.completed) return "completed";
    if (session.timestamp <= now) return "current";
    return "upcoming";
  };

  const getTotalWeight = () => {
    return sessions.reduce((total, session) => total + session.totalWeight, 0);
  };

  const getCompletedSessions = () => {
    return sessions.filter((session) => session.completed).length;
  };

  const resetAllData = () => {
    if (
      confirm(
        "Are you sure you want to reset all workout data? This cannot be undone."
      )
    ) {
      localStorage.removeItem("squat-challenge-sessions");
      window.location.reload(); // Reload to reset to default sessions
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Workout Session Tracker
        </h2>
        <button
          onClick={resetAllData}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
          title="Reset all workout data"
        >
          Reset Data
        </button>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {getCompletedSessions()}/12
          </div>
          <div className="text-sm text-blue-800">Sessions Completed</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {getTotalWeight().toLocaleString()} kg
          </div>
          <div className="text-sm text-green-800">Total Weight Lifted</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {nextSessionTime
              ? Math.ceil(
                  (nextSessionTime.getTime() - new Date().getTime()) /
                    (1000 * 60 * 60)
                )
              : 0}
            h
          </div>
          <div className="text-sm text-purple-800">Until Next Session</div>
        </div>
      </div>

      {/* Session List */}
      <div className="space-y-3">
        {sessions.map((session) => {
          const status = getSessionStatus(session);
          const statusColors = {
            completed: "bg-green-50 border-green-200 text-green-800",
            current: "bg-yellow-50 border-yellow-200 text-yellow-800",
            upcoming: "bg-gray-50 border-gray-200 text-gray-800",
          };

          return (
            <div
              key={session.id}
              className={`border rounded-lg p-4 ${statusColors[status]}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">
                      Session {session.id}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        status === "completed"
                          ? "bg-green-200 text-green-800"
                          : status === "current"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {status === "completed"
                        ? "✓ Completed"
                        : status === "current"
                        ? "🔥 Current"
                        : "⏰ Upcoming"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {session.timestamp.toLocaleString()}
                  </p>
                  {session.completed && (
                    <p className="text-sm text-gray-700 mt-1">
                      {session.weight} kg × {session.reps} reps ={" "}
                      {session.totalWeight.toLocaleString()} kg
                    </p>
                  )}
                </div>

                {status === "current" && (
                  <div className="mt-3 md:mt-0 md:ml-4">
                    {editingSession === session.id ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          value={tempWeight || ""}
                          className="px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-900 placeholder-gray-500 w-20"
                          onChange={(e) =>
                            setTempWeight(parseFloat(e.target.value) || 0)
                          }
                        />
                        <input
                          type="number"
                          placeholder="Reps"
                          value={tempReps || ""}
                          className="px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-900 placeholder-gray-500 w-20"
                          onChange={(e) =>
                            setTempReps(parseInt(e.target.value) || 0)
                          }
                        />
                        <button
                          onClick={saveSession}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                          title="Save session"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={clearEditing}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          title="Clear inputs"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(session.id)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Log Workout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>💡 Click on current session to log your workout results</p>
      </div>
    </div>
  );
}
