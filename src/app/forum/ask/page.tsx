"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
      await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category }),
      });
      router.push("/forum");
    } catch (err) {
      console.error("Error creating question:", err);
    } finally {
      setLoading(false);
    }
  }

  return ( 
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
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
            </select>
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
