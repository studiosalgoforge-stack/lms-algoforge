"use client";

import { useState } from "react";

const faqs = [
  { title: "Getting Started", content: "How to get started with our app." },
  { title: "FAQs", content: "Frequently asked questions." },
  { title: "Account & Billing", content: "Tips on account management." },
  { title: "Privacy & Security", content: "How we protect your data." },
  { title: "Moving To PPT", content: "Guide for migration." },
  { title: "Dev Docs", content: "Developer documentation." },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", query: "" });
  const [success, setSuccess] = useState(false);

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", query: "" });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">How can we help?</h1>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow cursor-pointer"
            onClick={() => toggleFAQ(idx)}
          >
            <h2 className="font-semibold mb-2">{faq.title}</h2>
            {openIndex === idx && <p className="text-gray-600">{faq.content}</p>}
          </div>
        ))}
      </div>

      {/* Support Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Submit a Query</h2>
        {success && <p className="text-green-600 mb-4">Submitted successfully!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="query"
            value={form.query}
            onChange={handleChange}
            placeholder="Your Query"
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
