"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export default function QuestionDetail() {
  const { id } = useParams();
  const [q, setQ] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch(`${BASE}/questions/${id}`);
    if (!res.ok) {
      console.error("Failed to load question");
      return;
    }
    const data = await res.json();
    setQ(data);
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

const submitAnswer = async () => {
  if (!answer.trim()) return;
  setSaving(true);
  try {
    const res = await fetch(`${BASE}/questions/${id}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        body: answer, 
        authorName: "Anonymous", // replace with user's name if logged in
        authorRole: "user" 
      }),
    });

    if (!res.ok) {
      console.error("Failed to post answer");
      setSaving(false);
      return;
    }

    const data = await res.json();
    setQ(data); // immediately update question with new answers
    setAnswer("");
  } finally {
    setSaving(false);
  }
};


  if (!q) return <main className="container py-6">Loading…</main>;

  return (
    <main className="container py-6 grid gap-6">
      {/* Question */}
      <article className="card p-6">
        <h1 className="text-2xl font-bold mb-2">{q.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          📁 {q.category} • 👁 {q.views} views
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: q.body.replace(/\n/g, "<br/>") }}
        />
      </article>

      {/* Answers */}
<section className="card p-6">
  <h2 className="text-xl font-semibold mb-3">Answers</h2>

  <button
    className="text-blue-500 text-sm mb-2"
    onClick={() => setShowAnswers((prev) => !prev)}
  >
    {showAnswers ? "Hide Answers" : `Show Answers (${q.answers?.length || 0})`}
  </button>

  {showAnswers ? (
    q.answers?.length > 0 ? (
      <div className="space-y-4">
        {q.answers.map((ans: any, idx: number) => (
          <div key={idx} className="border-b pb-3">
            <p className="prose max-w-none">{ans.body}</p>
            <p className="text-xs text-gray-500 mt-1">
              — {ans.authorName} ({ans.authorRole})
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-gray-600">No answers yet.</div>
    )
  ) : null}
</section>


      {/* Admin Post Answer */}
      <section className="card p-6">
        <h3 className="text-lg font-semibold mb-2">Admin: Post an Answer</h3>
        <textarea
          className="w-full border p-2 rounded-md"
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write an answer…"
        />
        <div className="mt-3 flex justify-end">
          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={submitAnswer}
          >
            {saving ? "Posting…" : "Post Answer"}
          </button>
        </div>
      </section>
    </main>
  );
}
