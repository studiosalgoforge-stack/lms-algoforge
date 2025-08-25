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
}

export default function InterviewTab({
  interviewQuestions,
  courseId,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedOption,
  setSelectedOption,
}: InterviewTabProps) {
  const questions = interviewQuestions[courseId] || [];
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!questions.length) return <p>No interview questions available.</p>;

  const currentQ = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;

    if (selectedOption === currentQ.correct) {
      setFeedbackMsg("✅ Correct Answer!");
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setSelectedOption(null);
          setFeedbackMsg(null);
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setQuizCompleted(true);
        }
      }, 1500);
    } else {
      setFeedbackMsg("❌ Incorrect answer, please try again.");
    }
  };

  return (
    <div>
      {!quizCompleted && currentQuestionIndex < questions.length ? (
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
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
                    isSelected ? "border-purple-500 bg-purple-50" : "border-gray-300"
                  } ${
                    feedbackMsg && isSelected && isCorrect
                      ? "bg-green-200 border-green-500"
                      : ""
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-gray-400"
          >
            Submit Answer
          </button>

          {/* Feedback Message at Bottom */}
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
          <p className="mt-2 text-lg">You finished all questions.</p>
          <button
            onClick={() => {
              setQuizCompleted(false);
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setFeedbackMsg(null);
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
