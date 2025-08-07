import { ChevronDown, Search } from 'lucide-react';

const faqCategories = [
    { id: 'payment', name: 'Payment' },
    { id: 'project', name: 'My Project' },
    { id: 'service', name: 'Service' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'product', name: 'Product Questions' }
];

const faqQuestions = [
    "What is Webflow and why is it the best website builder?",
    "How do you clone a Webflow Template from the Showcase?",
    "What are the key features of Webflow?",
    "How do I get started with Webflow?",
    "What payment methods do you accept?",
    "How do I cancel my subscription?"
];

export default function FAQPage() {
  return (
    <div>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hello, how can we help?</h1>
        <p className="text-gray-200 mb-6">or choose a category to quickly find the help you need</p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Ask a question"
            className="w-full bg-black bg-opacity-20 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Categories */}
        <div className="w-1/3">
          <div className="flex flex-col gap-2">
            {faqCategories.map((category, index) => (
              <button
                key={category.id}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  index === 0 
                    ? 'bg-green-500 text-white font-semibold' 
                    : 'bg-secondary-dark text-gray-300 hover:bg-gray-700'
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
            {faqQuestions.map((question, index) => (
              <div key={index} className="bg-secondary-dark rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">{question}</h3>
                  <button className="bg-white/10 rounded-full p-1">
                    <ChevronDown className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}