"use client";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqCategories = [
  { id: "courses", name: "Courses" },
  { id: "payment", name: "Payment" },
  { id: "project", name: "My Project" },
  { id: "service", name: "Service" },
  { id: "pricing", name: "Pricing" },
  { id: "product", name: "Product Questions" },
];

const faqData = {
  courses: [
    {
      q: "How do I enroll in a course?",
      a: "Simply click the 'Enroll' button on your desired course page and complete the sign-up process. You’ll get instant access after payment.",
    },
    {
      q: "Can I track my course progress?",
      a: "Yes! Each course has a progress bar showing how much content you've completed. You can resume from where you left off anytime.",
    },
  ],
  payment: [
    {
      q: "What payment methods do you accept?",
      a: "We accept credit/debit cards, PayPal, and certain regional wallets like UPI in India.",
    },
    {
      q: "Is there a refund policy?",
      a: "Yes, we offer a 7-day refund policy if you are not satisfied with the course.",
    },
  ],
  project: [
    {
      q: "How do I submit my project?",
      a: "You can submit your project in the 'My Projects' section by uploading the required files and documentation.",
    },
  ],
  service: [
    {
      q: "Do you offer one-on-one mentoring?",
      a: "Yes, premium courses come with one-on-one mentoring sessions with industry experts.",
    },
  ],
  pricing: [
    {
      q: "Are there discounts for bulk purchases?",
      a: "Yes, we offer special discounts for teams and bulk course purchases.",
    },
  ],
  product: [
    {
      q: "Can I access the courses offline?",
      a: "Currently, our courses are only available online, but you can download certain resources for offline reference.",
    },
  ],
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("courses");
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="p-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hello, how can we help?</h1>
        <p className="text-gray-200 mb-6">Choose a category or search your question below</p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Ask a question"
            className="w-full bg-black bg-opacity-20 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white-400"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={20}
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Categories */}
        <div className="w-1/3">
          <div className="flex flex-col gap-2">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white font-semibold"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Questions */}
        <div className="w-2/3">
          <div className="flex flex-col gap-4">
            {faqData[activeCategory]?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 transition-all duration-300"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-white font-medium">{item.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                      openQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Answer with slide down effect */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openQuestion === index ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
