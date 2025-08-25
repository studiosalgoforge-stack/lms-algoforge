"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChevronDown, ChevronUp, FileText, Video } from "lucide-react";

interface FAQ {
  id: string;
  title: string;
  summary: string;
  content: string[];
  section: string;
}

// Sample FAQs (6 cards, all different topics)
const faqs: FAQ[] = [
  {
    id: "faq1",
    title: "Course Purchase & Access",
    summary: "Learn how to buy and access courses instantly.",
    content: [
      "Browse courses and add them to your cart.",
      "Complete payment securely through our gateway.",
      "Access purchased courses from the 'My Courses' dashboard.",
      "If payment fails, try again or contact support.",
    ],
    section: "Courses",
  },
  {
    id: "faq2",
    title: "Downloading PPTs",
    summary: "Understand how to download and view PPT materials.",
    content: [
      "Each course includes downloadable PPT resources.",
      "Click the 'Download PPT' button inside the course module.",
      "Files are provided in PDF/PPTX format for offline study.",
    ],
    section: "Resources",
  },
  {
    id: "faq3",
    title: "Watching Video Lectures",
    summary: "Access course videos with ease on all devices.",
    content: [
      "Video lectures are available inside each course chapter.",
      "Use the video player with speed control and subtitles.",
      "Videos can be streamed anytime, anywhere.",
      "Currently, offline video download is not supported.",
    ],
    section: "Videos",
  },
  {
    id: "faq4",
    title: "Interview Questions Practice",
    summary: "Prepare for jobs with curated interview Q&A.",
    content: [
      "Access practice interview questions under the 'Interview Prep' tab.",
      "Questions are categorized by topic and difficulty.",
      "You can attempt mock tests and review answers instantly.",
    ],
    section: "Interview Prep",
  },
  {
    id: "faq5",
    title: "Discussion Forum",
    summary: "Engage with peers and instructors in discussions.",
    content: [
      "Join the discussion forum from the course dashboard.",
      "Post your questions, share resources, and answer peers.",
      "Instructors also participate in active discussions.",
      "Follow threads to get notified of replies.",
    ],
    section: "Community",
  },
  {
    id: "faq6",
    title: "Reports & Progress Tracking",
    summary: "Monitor your learning journey with reports.",
    content: [
      "Go to 'My Progress' under your profile menu.",
      "Track completed modules, quizzes, and scores.",
      "Download progress reports for personal records.",
      "Reports help identify weak areas for improvement.",
    ],
    section: "Progress & Reports",
  },
];

// Additional Resources
const resources = [
  { title: "Video Tutorial: How to Buy a Course", link: "#", type: "video" },
  { title: "PDF Guide: Using the Dashboard", link: "#", type: "pdf" },
  { title: "Video Walkthrough: Discussion Forum", link: "#", type: "video" },
];

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", query: "" });
  const [success, setSuccess] = useState(false);
const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

 const toggleFAQ = (id: string) => {
  setOpenCards((prev) => ({
    ...prev,
    [id]: !prev[id], // toggle only this card
  }));
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:10000/api/support", {
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
    <ProtectedRoute>
      <div className="min-h-screen bg-purple-50 p-6 md:p-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-purple-700">
            How can we help you?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Browse FAQs, tutorials, and submit a query if you need assistance.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-700 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => {
             const isOpen = !!openCards[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <button
                    className="w-full text-left p-6 md:p-8 flex justify-between items-center"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div>
                      <h3 className="text-purple-700 font-bold text-lg md:text-xl mb-1 flex items-center">
                        <span className="mr-2">❓</span>
                        {faq.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {faq.summary}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="text-purple-500 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-purple-500 w-5 h-5" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="bg-purple-50 px-6 md:px-8 pb-6 rounded-b-xl border-t border-gray-200">
                      {faq.content.map((line, i) => (
                        <p
                          key={i}
                          className="text-gray-700 text-sm md:text-base py-1"
                        >
                          • {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-purple-700">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 flex items-center space-x-3"
              >
                {res.type === "video" ? (
                  <Video className="text-purple-500 w-6 h-6" />
                ) : (
                  <FileText className="text-purple-500 w-6 h-6" />
                )}
                <span className="font-semibold text-purple-700 text-lg md:text-xl">
                  {res.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Submit Query Form */}
        <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-700">
            Submit a Query
          </h2>
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
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
