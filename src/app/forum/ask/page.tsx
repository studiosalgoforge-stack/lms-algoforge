"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General Question");
  const [loading, setLoading] = useState(false);
 const [image, setImage] = useState<File | null>(null);


 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/questions", {
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
              <option>Data Science</option>
              <option>Machine Learning</option>
              <option>Web Development</option>
              <option>AI</option>
            </select>
              <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  );
}
