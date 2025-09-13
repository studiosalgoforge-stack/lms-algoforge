"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { InterviewQuestion } from "@/app/data/interviewData";
import Confetti from "react-confetti";

interface InterviewTabProps {
  interviewQuestions: Record<string, InterviewQuestion[]>;
  courseId: string;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  selectedOption: number | null;
  setSelectedOption: Dispatch<SetStateAction<number | null>>;
  userId: string;
}

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function InterviewTab({
  interviewQuestions,
  courseId,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedOption,
  setSelectedOption,
  userId,
}: InterviewTabProps) {
  const questions = interviewQuestions[courseId] || [];
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  if (!questions.length) {
    return <p>No interview questions available.</p>;
  }

  const currentQ = questions[currentQuestionIndex];
  if (!currentQ) {
    return <p>Loading question...</p>;
  }

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correct;

    if (isCorrect) {
      setFeedbackMsg("✅ Correct Answer!");
      setScore((prev) => prev + 1);
    } else {
      setFeedbackMsg("❌ Incorrect! The correct answer is highlighted.");
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setSelectedOption(null);
        setFeedbackMsg(null);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // quiz finished
        setQuizCompleted(true);
        const finalScore = isCorrect ? score + 1 : score;
        saveQuizResult(finalScore);
      }
    }, 1500);
  };

  // ✅ Save quiz result to backend
  const saveQuizResult = async (finalScore: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${BASE}/progress/quiz/${courseId}-quiz`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: finalScore,
          correctAnswers: finalScore,
          totalQuestions: questions.length,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to save quiz result:", err);
    }
  };

  const progressPercent =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>
      {!quizCompleted ? (
        <div className="p-4 border rounded-lg shadow-md relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
            <div
              className="h-2 bg-green-500 transition-all duration-700 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <h2 className="text-lg font-semibold mb-4 mt-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="mb-4">{currentQ.question}</p>

          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;

              return (
                <label
                  key={idx}
                  className={`block p-3 border rounded-md cursor-pointer transition ${
                    isSelected
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300"
                  } ${
                    feedbackMsg && isCorrect && "bg-green-200 border-green-500"
                  } ${
                    feedbackMsg &&
                    isSelected &&
                    !isCorrect &&
                    "bg-red-200 border-red-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="option"
                    value={idx}
                    checked={isSelected}
                    onChange={() => setSelectedOption(idx)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-gray-400"
          >
            Submit Answer
          </button>

          {feedbackMsg && (
            <p
              className={`mt-4 text-center font-medium ${
                feedbackMsg.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedbackMsg}
            </p>
          )}
        </div>
      ) : (
        <div className="text-center relative">
          <Confetti />
          <h2 className="text-2xl font-bold text-green-700">🎉 End of Quiz!</h2>
          <p className="mt-2 text-lg">
            You scored <span className="font-bold">{score}</span> out of{" "}
            {questions.length}
          </p>
          <button
            onClick={() => {
              setQuizCompleted(false);
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setFeedbackMsg(null);
              setScore(0);
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            🔄 Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
