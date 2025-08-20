const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export async function listQuestions({
  page,
  category,
}: {
  page: number;
  category: string;
}) {
  const url = new URL(`${BASE}/questions`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", "6");
  if (category && category !== "All") {
    url.searchParams.set("category", category);
  }

  console.log("Fetching:", url.toString());
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url.toString()}`);
  return res.json();
}


export async function createQuestion(payload: {
  title: string;
  body: string;
  category: string;
  tags: string[];
}) {
  const res = await fetch(`${BASE}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create question");
  return res.json();
}
