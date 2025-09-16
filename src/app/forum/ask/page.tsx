"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function AskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General Question");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("category", category);

      const res = await fetch(`${BASE}/questions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.error || "Failed to post question");
      }

      router.push("/forum");
    } catch (err) {
      console.error("Error creating question:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto py-10">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-start gap-4"> {/* Use flexbox to align items */}
            <button
              onClick={() => router.back()} // Go back to the previous page
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="text-xl text-purple-900" />
            </button>
            <CardTitle className="text-2xl text-purple-900 font-bold"> {/* Increase font size and weight */}
              Ask a Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Input
                placeholder="Question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Describe your problem..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <select
                className="border rounded p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>General Question</option>
                <option>Technical</option>
                <option>Non-Technical</option>
                <option>Data Science</option>
                <option>Machine Learning</option>
                <option>Web Development</option>
                <option>AI</option>
              </select>
              <Button type="submit" className="text-white bg-purple-400 hover:bg-purple-500" disabled={loading}>
                {loading ? "Posting..." : "Post Question"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}