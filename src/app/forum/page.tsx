"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

type Answer = {
  _id?: string; // if Mongo generates id
  body: string;
  authorName: string;
  authorRole: string;
  userId?: string; // user identifier
  createdAt: string;
};

type Question = {
  _id: string;
  title: string;
  body: string;
  category: string;
  views: number;
  createdAt: string;
  answers: Answer[];
  userAnswer?: string; // for textarea
};

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export default function ForumPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  // Track current user (temporary anonymous id)
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("forumUserId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("forumUserId", id);
    }
    setCurrentUserId(id);
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE}/questions?page=${page}&pageSize=6&category=${category || ""}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, category]);

  const toggleExpand = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
    );
  };

  const submitAnswer = async (q: Question) => {
    if (!q.userAnswer?.trim()) return;

    try {
      const res = await fetch(`${BASE}/questions/${q._id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: q.userAnswer,
          authorName: "Anonymous",
          authorRole: "user",
          userId: currentUserId,
        }),
      });
      if (!res.ok) throw new Error("Failed to post answer");
      const data = await res.json();
      const updatedQuestions = questions.map((ques) =>
        ques._id === q._id ? { ...data, userAnswer: "" } : ques
      );
      setQuestions(updatedQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAnswer = async (questionId: string, answerId: string) => {
    try {
      const res = await fetch(`${BASE}/questions/${questionId}/answers/${answerId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete answer");
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  const editAnswer = async (questionId: string, answerId: string, newBody: string) => {
    try {
      const res = await fetch(`${BASE}/questions/${questionId}/answers/${answerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newBody }),
      });
      if (!res.ok) throw new Error("Failed to edit answer");
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto  p-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <select
          className="border rounded p-2 mb-4"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="General Question">General</option>
          <option value="Technical">Technical</option>
          <option value="Non-Technical">Non-Technical</option>
        </select>

        <Link href="/forum/ask">
          <Button>Ask Question</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="grid gap-4">
          {questions.length === 0 && <p className="text-gray-500">No questions yet. Be the first!</p>}

          {questions.map((q) => (
            <Card key={q._id} className="shadow-md">
              <CardHeader>
                <CardTitle
                  className="text-lg font-semibold cursor-pointer"
                  onClick={() => toggleExpand(q._id)}
                >
                  {q.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{q.body}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Category: {q.category}</span>
                  <span>{q.views} views</span>
                </div>

                {expandedQuestions.includes(q._id) && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">Answers ({q.answers?.length || 0})</h4>

                    {q.answers?.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {q.answers.map((ans) => (
                          <div key={ans._id} className="border-b pb-2">
                            <p>{ans.body}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              — {ans.authorName} ({ans.authorRole})
                            </p>

                            {ans.userId === currentUserId && (
                              <div className="flex gap-2 mt-1 text-xs">
                                <button
                                  className="text-blue-500"
                                  onClick={() => {
                                    const newBody = prompt("Edit your answer", ans.body);
                                    if (newBody) editAnswer(q._id, ans._id!, newBody);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-500"
                                  onClick={() => deleteAnswer(q._id, ans._id!)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mb-4">No answers yet.</p>
                    )}

                    <textarea
                      className="w-full border p-2 rounded mb-2"
                      rows={3}
                      placeholder="Write an answer..."
                      value={q.userAnswer || ""}
                      onChange={(e) => {
                        const updatedQuestions = questions.map((ques) =>
                          ques._id === q._id ? { ...ques, userAnswer: e.target.value } : ques
                        );
                        setQuestions(updatedQuestions);
                      }}
                    />
                    <button
                      className="bg-black text-white px-3 py-1 rounded"
                      onClick={() => submitAnswer(q)}
                    >
                      Post Answer
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-6">
        <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
        <span className="px-3 py-1 text-sm">Page {page} of {totalPages}</span>
        <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
