"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface FAQ {
  title: string;
  summary: string;
  content: string[];
  section: string;
}

// Sample FAQs
const faqs: FAQ[] = [
  {
    title: "Getting Started",
    summary: "Learn how to start quickly with your account.",
    content: [
      "Step 1: Sign up and verify your email.",
      "Step 2: Complete your profile with your details.",
      "Step 3: Explore dashboard features and tutorials.",
      "Step 4: Access resources and docs to get familiar.",
    ],
    section: "Getting Started",
  },
  {
    title: "Account & Billing",
    summary: "Manage your account and payments effectively.",
    content: [
      "Update your billing information in your profile.",
      "View and download invoices.",
      "Manage subscription plans and cancellations.",
      "Contact support if you encounter billing issues.",
    ],
    section: "Account & Billing",
  },
  {
    title: "Privacy & Security",
    summary: "Understand how we keep your data safe.",
    content: [
      "We use end-to-end encryption for sensitive data.",
      "Two-factor authentication is available.",
      "Review and adjust your privacy settings in your profile.",
    ],
    section: "Privacy & Security",
  },
];

// Additional Resources
const resources = [
  { title: "Video Tutorial: Getting Started", link: "#" },
  { title: "PDF Guide: Account Setup", link: "#" },
  { title: "Video Tutorial: Security Tips", link: "#" },
];

export default function SupportPage() {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", query: "" });
  const [success, setSuccess] = useState(false);
const [openCard, setOpenCard] = useState<string | null>(null);

const toggleFAQ = (id: string) => {
  setOpenCard(openCard === id ? null : id);
};

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

  // Group FAQs by section
  const groupedFAQs = faqs.reduce((acc: Record<string, FAQ[]>, faq) => {
    if (!acc[faq.section]) acc[faq.section] = [];
    acc[faq.section].push(faq);
    return acc;
  }, {});

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-purple-50 p-6 md:p-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl sm:text-3xl font-bold mb-4 text-purple-700">
            How can we help you?
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Browse FAQs, tutorials, and submit a query if you need assistance.
          </p>
        </div>

        {/* Top FAQs */}
        <div className="mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-purple-700">
            Top FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.slice(0, 3).map((faq) => (
              <div
                key={faq.title}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 md:p-8 cursor-pointer flex flex-col justify-between"
                onClick={() => (faq.title)}
              >
                <h3 className="text-purple-700 font-bold text-lg md:text-xl mb-2 flex items-center">
                  <span className="mr-2 text-purple-500">❓</span>
                  {faq.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">{faq.summary}</p>
                {openCard=== faq.title && (
                  <div className="bg-purple-50 p-4 rounded-b-xl border-t border-gray-200 mt-2">
                    {faq.content.map((line, i) => (
                      <div key={i} className="flex items-start mb-2">
                        <span className="text-purple-400 font-bold mr-2">•</span>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All FAQs by Section */}
        <div className="mb-12 max-w-6xl mx-auto">
          {Object.keys(groupedFAQs).map((section) => (
            <div key={section} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-700">{section}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedFAQs[section].map((faq) => (
                  <div
                    key={faq.title}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 md:p-8 cursor-pointer flex flex-col justify-between"
                    onClick={() => toggleFAQ(faq.title)}
                  >
                    <h3 className="text-purple-700 font-bold text-lg md:text-xl mb-2 flex items-center">
                      <span className="mr-2 text-purple-500">❓</span>
                      {faq.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">{faq.summary}</p>
                    {openCard === faq.title && (
                      <div className="bg-purple-50 p-4 rounded-b-xl border-t border-gray-200 mt-2">
                        {faq.content.map((line, i) => (
                          <div key={i} className="flex items-start mb-2">
                            <span className="text-purple-400 font-bold mr-2">•</span>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{line}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-purple-700">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 md:p-8 block"
              >
                <h3 className="font-semibold text-purple-700 mb-2 text-lg md:text-xl">{res.title}</h3>
              </a>
            ))}
          </div>
        </div>

        {/* Submit Query Form */}
        <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-700">Submit a Query</h2>
          {success && <p className="text-green-600 mb-4">Submitted successfully!</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border rounded-lg hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <textarea
              name="query"
              value={form.query}
              onChange={handleChange}
              placeholder="Your Query"
              className="w-full p-3 border rounded-lg hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              rows={5}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-purple-400 text-white  rounded hover:bg-purple-500 cursor-pointer"
>
  Submit
</button>
 </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}