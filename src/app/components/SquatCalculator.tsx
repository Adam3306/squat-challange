"use client";

import { useState } from "react";

export default function SquatCalculator() {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [targetTotal] = useState<number>(6437.5); // kg per session

  const calculateReps = () => {
    if (weight > 0) {
      const calculatedReps = Math.ceil(targetTotal / weight);
      setReps(calculatedReps);
      setTotalWeight(calculatedReps * weight);
    } else {
      setReps(0);
      setTotalWeight(0);
    }
  };

  const calculateWeight = () => {
    if (reps > 0) {
      const calculatedWeight = Math.ceil(targetTotal / reps);
      setWeight(calculatedWeight);
      setTotalWeight(reps * calculatedWeight);
    } else {
      setWeight(0);
      setTotalWeight(0);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setWeight(value);
    if (value > 0) {
      const calculatedReps = Math.ceil(targetTotal / value);
      setReps(calculatedReps);
      setTotalWeight(calculatedReps * value);
    } else {
      setReps(0);
      setTotalWeight(0);
    }
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setReps(value);
    if (value > 0) {
      const calculatedWeight = Math.ceil(targetTotal / value);
      setWeight(calculatedWeight);
      setTotalWeight(value * calculatedWeight);
    } else {
      setWeight(0);
      setTotalWeight(0);
    }
  };

  const remainingWeight = Math.max(0, totalWeight - targetTotal);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Squat Calculator
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Target:{" "}
        <span className="font-bold text-blue-600">
          {targetTotal.toLocaleString()} kg
        </span>{" "}
        per session
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Weight per rep (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight || ""}
            onChange={handleWeightChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter weight..."
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label
            htmlFor="reps"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Number of reps
          </label>
          <input
            type="number"
            id="reps"
            value={reps || ""}
            onChange={handleRepsChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter reps..."
            min="0"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{reps}</div>
            <div className="text-sm text-gray-600">Reps</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{weight} kg</div>
            <div className="text-sm text-gray-600">Per Rep</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {totalWeight.toLocaleString()} kg
            </div>
            <div className="text-sm text-gray-600">Total Weight</div>
          </div>
        </div>
      </div>

      {totalWeight > 0 && (
        <div className="mt-4 p-4 rounded-lg">
          {totalWeight >= targetTotal ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="font-medium">Target achieved!</span>
              </div>
              {remainingWeight > 0 && (
                <p className="mt-1 text-sm">
                  You'll lift {remainingWeight.toLocaleString()} kg extra! 💪
                </p>
              )}
            </div>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">⚠</span>
                <span className="font-medium">Need more weight!</span>
              </div>
              <p className="mt-1 text-sm">
                You need {(targetTotal - totalWeight).toLocaleString()} kg more
                to reach the target.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          💡 Tip: Enter either weight or reps, and the calculator will suggest
          the other value
        </p>
      </div>
    </div>
  );
}
