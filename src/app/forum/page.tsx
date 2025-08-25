"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

interface Answer {
  _id: string;
  body: string;       // fixed field name
  authorId: string;
  authorName: string;
  authorRole: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Question {
  _id: string;
  title: string;
  body: string;
  category: string;
  image?: string;
  answers: Answer[];
}

// Sample fallback questions
const sampleQuestions: Question[] = [
  {
    _id: "1",
    title: "What is the difference between supervised and unsupervised learning?",
    body: "I am confused about supervised vs unsupervised. Can someone explain with examples?",
    category: "Machine Learning",
    answers: [
      { _id: "a1", body: "Supervised = labeled data, Unsupervised = unlabeled data.", authorId: "u1", authorName: "Admin", authorRole: "admin" }
    ],
  },
  {
    _id: "2",
    title: "Best resources to learn React?",
    body: "I am starting with frontend. Which resources should I follow?",
    category: "Web Development",
    answers: [],
  },
];

export default function ForumPage() {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [answerText, setAnswerText] = useState<Record<string, string>>({});
  const [editingAnswer, setEditingAnswer] = useState<Record<string, string>>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  // Decode JWT once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decoded: any = jwtDecode(token); 
        setCurrentUserId(decoded.id);
      } catch (err) {
        console.error("JWT decode error:", err);
        alert("Invalid login session. Please log in again.");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Fetch questions
  
async function fetchQuestions(fetchCategory?: string) {
  try {
    const token = localStorage.getItem("token"); // ✅ get token
    const catQuery = fetchCategory ? `&category=${fetchCategory}` : "";
    const res = await fetch(
      `${BASE}/questions?page=${page}&pageSize=5${catQuery}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // ✅ send token
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    if (data.items?.length) {
      setQuestions(data.items);
    } else {
      setQuestions(sampleQuestions);
    }
  } catch (err) {
    alert("Could not fetch questions. Showing sample data.");
    setQuestions(sampleQuestions);
  }
}

  useEffect(() => {
    fetchQuestions(category);
  }, [page, category]);

  const handleNewQuestion = () => fetchQuestions(category);

  async function postAnswer(qId: string) {
    const token = localStorage.getItem("token");
    const body = answerText[qId];
    if (!body?.trim()) return;

    try {
      const res = await fetch(`${BASE}/questions/${qId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error("Failed to post answer");
      const updatedQuestion = await res.json();

      setQuestions((prev) =>
        prev.map((q) => (q._id === qId ? updatedQuestion : q))
      );
      setAnswerText((prev) => ({ ...prev, [qId]: "" }));
    } catch (err) {
      console.error(err);
      alert("Failed to post answer");
    }
  }

  // ✅ Edit answer
  async function editAnswer(qId: string, aId: string) {
    const token = localStorage.getItem("token");
    const body = editingAnswer[aId];
    if (!body?.trim()) return;

    try {
      const res = await fetch(`${BASE}/questions/${qId}/answers/${aId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error("Failed to edit answer");
      const updatedQuestion = await res.json();

      setQuestions((prev) =>
        prev.map((q) => (q._id === qId ? updatedQuestion : q))
      );
      setEditingAnswer((prev) => ({ ...prev, [aId]: "" }));
    } catch (err) {
      console.error(err);
      alert("Failed to edit answer");
    }
  }

  // ✅ Delete answer
  async function deleteAnswer(qId: string, aId: string) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE}/questions/${qId}/answers/${aId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete answer");
      setQuestions((prev) =>
        prev.map((q) => ({
          ...q,
          answers: q.answers.filter((a) => a._id !== aId),
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete answer");
    }
  }

  return (
       <ProtectedRoute>
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-purple-800">Forum</CardTitle>
          <Button className="bg-purple-400 hover:bg-purple-500" onClick={() => router.push("/forum/ask")}>Ask Question</Button>
        </CardHeader>
        <CardContent>
          <select
            className="border rounded p-2 mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>General Question</option>
            <option>Technical</option>
            <option>Non-Technical</option>
            <option>Data Science</option>
            <option>Machine Learning</option>
            <option>Web Development</option>
            <option>AI</option>
          </select>

          {questions.length > 0 ? (
            questions.map((q) => (
              <Card key={q._id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-purple-700">{q.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{q.body}</p>
                  {q.image && <img src={`${BASE}${q.image}`} alt="question" className="my-2 rounded max-h-64 object-cover" />}
                  <p className="text-sm text-gray-500">Category: {q.category}</p>
                  <Button
                    variant="outline"
                    className="mt-2 border-purple-600 text-purple-500 hover:text-purple-600"
                    onClick={() =>
                      setExpandedQuestions((prev) => ({
                        ...prev,
                        [q._id]: !prev[q._id],
                      }))
                    }
                  >
                    {expandedQuestions[q._id] ? "Hide Answers" : "Show Answers"}
                  </Button>

                  {expandedQuestions[q._id] && (
                    <div className="mt-4">
                      {(q.answers || []).map((ans) => (
                        <div key={ans._id} className="border p-2 rounded mb-2">
                          {currentUserId === ans.authorId ? (
                            <>
                              <Textarea
                                value={editingAnswer[ans._id] ?? ans.body}
                                onChange={(e) =>
                                  setEditingAnswer({
                                    ...editingAnswer,
                                    [ans._id]: e.target.value,
                                  })
                                }
                              />
                              <div className="flex gap-2 mt-1">
                                <Button size="sm" onClick={() => editAnswer(q._id, ans._id)}>Save</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteAnswer(q._id, ans._id)}>Delete</Button>
                              </div>
                            </>
                          ) : (
                            <p>{ans.body}</p>
                          )}
                        </div>
                      ))}

                      <Textarea
                        placeholder="Write your answer..."
                        value={answerText[q._id] || ""}
                        onChange={(e) =>
                          setAnswerText({
                            ...answerText,
                            [q._id]: e.target.value,
                          })
                        }
                      />
                      <Button className="mt-2" onClick={() => postAnswer(q._id)}>Post Answer</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No questions found.</p>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <span>Page {page}</span>
            <Button variant="outline" onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  );
}
