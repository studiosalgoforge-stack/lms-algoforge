"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

interface Material {
  name: string;
  url: string;
   assignments?: string[];
}

interface InterviewQuestion {
  question: string;
  options: string[];
  correct?: number;
}

// ===== MANUAL INTERVIEW QUESTIONS =====
const interviewQuestions: InterviewQuestion[] = [
  // Data Science - Count Data / Poisson Regression
  {
    question: "Which regression model is most commonly used for modeling count data?",
    options: ["Linear regression", "Logistic regression", "Poisson regression", "Ridge regression"],
    correct: 2,
  },
  {
    question: "In Poisson regression, what is the typical relationship between the mean and variance of the count variable?",
    options: ["Variance > Mean", "Variance < Mean", "Variance = Mean", "Variance is independent of Mean"],
    correct: 2,
  },
  {
    question: "Which model is preferred when count data show overdispersion (variance > mean)?",
    options: ["Poisson regression", "Logistic regression", "Negative binomial regression", "Linear regression"],
    correct: 2,
  },
  {
    question: "What is “overdispersion” in count data regression?",
    options: ["Mean < Variance", "Variance < Mean", "Variance = Mean", "Mean = 0"],
    correct: 0,
  },
  {
    question: "The log-link function in Poisson regression transforms the expected value of the count variable as:",
    options: ["log(y) = Xβ", "y = exp(Xβ)", "exp(y) = Xβ", "log(y) = β"],
    correct: 0,
  },
  {
    question: "The “offset” term in a Poisson regression is used to:",
    options: ["Handle binary predictors", "Model rates by accounting for exposure", "Reduce multicollinearity", "Increase variance"],
    correct: 1,
  },
  {
    question: "Which of the following models handles excess zeros in count data?",
    options: ["Linear regression", "Poisson regression", "Zero-inflated Poisson regression", "Lasso regression"],
    correct: 2,
  },
  {
    question: "If the mean and variance of a count response variable are noticeably different, which check/test might you use?",
    options: ["Shapiro-Wilk test", "CT test for overdispersion", "T-test", "Bartlett’s test"],
    correct: 1,
  },
  {
    question: "Which statistical distribution underlies the Poisson regression model?",
    options: ["Normal", "Binomial", "Poisson", "Uniform"],
    correct: 2,
  },
  {
    question: "What is the key assumption of the negative binomial regression model?",
    options: ["Overdispersion is present", "Underdispersion is present", "Mean equals variance", "Data are binary"],
    correct: 0,
  },
  {
    question: "Which would NOT be a valid dependent variable for count data regression?",
    options: ["Number of website hits", "Number of customer complaints", "Customer satisfaction score (1-5 scale)", "Number of accidents in a month"],
    correct: 2,
  },
  {
    question: "When is zero-inflated negative binomial regression preferred over zero-inflated Poisson?",
    options: ["When data are underdispersed", "When many zeros and overdispersion", "When only a few zeros", "When variance < mean"],
    correct: 1,
  },
  {
    question: "The Maximum Likelihood Estimation (MLE) method for Poisson regression optimizes which function?",
    options: ["Log-likelihood", "Sum of squared errors", "Posterior probability", "Prior probability"],
    correct: 0,
  },
  {
    question: "What does the “exposure” variable adjust for in count regression?",
    options: ["Heteroscedasticity", "Prediction intervals", "Different observation periods or populations", "Multicollinearity"],
    correct: 2,
  },
  {
    question: "The Vuong test is commonly used to compare which types of models?",
    options: ["Nested models only", "Zero-inflated vs. non-zero-inflated models", "Only linear models", "Only binomial models"],
    correct: 1,
  },
  {
    question: "Which R function is used for fitting Poisson regression models?",
    options: ["glm(y ~ x, family=poisson)", "lm(y ~ x)", "t.test()", "aov()"],
    correct: 0,
  },
  {
    question: "In which situation might a Quasi-Poisson model be preferred?",
    options: ["When mean < variance", "For binary data", "When variance ≠ mean, but stepwise model selection metrics are unnecessary", "To model normal data"],
    correct: 2,
  },
  {
    question: "Which of the following can NOT be modeled by count data regression?",
    options: ["Number of hospital visits", "Number of defective items", "Daily rainfall (in mm)", "Number of accidents per year"],
    correct: 2,
  },
  {
    question: "What does a “rate ratio” represent in count regression?",
    options: ["Odds ratio", "Relative expected count for 1-unit predictor change", "Standard deviation ratio", "Intercept"],
    correct: 1,
  },
  {
    question: "Which model selection criterion can be used for negative binomial but not quasi-Poisson regression?",
    options: ["Akaike Information Criterion (AIC)", "BIC", "R-squared", "RMSE"],
    correct: 0,
  },

  // SQL
  {
    question: "What is a primary key in SQL?",
    options: ["A column that uniquely identifies a row", "A column that stores text", "A column used for sorting", "None of the above"],
    correct: 0,
  },
  {
    question: "Which SQL command is used to remove a table?",
    options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"],
    correct: 0,
  },
  {
    question: "Which SQL clause is used to filter results?",
    options: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"],
    correct: 0,
  },
  {
    question: "Which SQL function returns the number of rows?",
    options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
    correct: 0,
  },
  {
    question: "Which JOIN returns only matching rows from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correct: 0,
  },

  // Power BI
  {
    question: "Power BI is mainly used for?",
    options: ["Web development", "Data visualization", "Machine learning", "Game development"],
    correct: 1,
  },
  {
    question: "Which feature in Power BI allows combining multiple data sources?",
    options: ["Power Query", "DAX", "Power Automate", "Dataflow"],
    correct: 0,
  },
  {
    question: "What is DAX used for in Power BI?",
    options: ["Data modeling and calculations", "Web development", "Machine learning", "Report design"],
    correct: 0,
  },
  {
    question: "Which visualization in Power BI is used for trends over time?",
    options: ["Line chart", "Pie chart", "Bar chart", "Map visualization"],
    correct: 0,
  },
  {
    question: "Power BI dashboards can be shared via?",
    options: ["Power BI Service", "Excel only", "Word documents", "PowerPoint only"],
    correct: 0,
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const [topics, setTopics] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showPPT, setShowPPT] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tabs for desktop
  const [activeTab, setActiveTab] = useState<"study" | "interview" | "assignments">("study");
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);

  // Scrollable PPT view
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scrollContent = (direction: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: width * direction, behavior: "smooth" });
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const correctIndex = interviewQuestions[currentQuestionIndex].correct!;
    if (selectedOption === correctIndex) {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Wrong answer! Correct option is highlighted. Please select the correct answer to continue.");
    }
  };

  // Fetch topics & assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pptRes = await fetch(`${BASE}/drive/${id}/ppts`);
        const pptData = await pptRes.json();
         const finalTopics = Array.isArray(pptData) && pptData.length
          ? pptData.map((file: any) => ({
              name: file.name.replace(/\.pptx?$/i, ""),
              url: file.previewUrl || file.webViewLink,
              assignments:[],
            }))
            :[];
  

        const assRes = await fetch(`${BASE}/drive/${id}/assignments`);
        const assData = await assRes.json();
        
     const finalTopicsWithAssignments = finalTopics.map((topic, idx) => ({
  ...topic,
  assignments: assData[idx]?.assignments || [],
          }));
          setTopics(finalTopicsWithAssignments);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);

         const backups: Record<string, string[]> = {
            "Data-Science": [
    "https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview",
    "https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview",
    "https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview",
    "https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview",
    "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview",
  ],
  SQL: [
    "https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview",
    "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview",
    "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview",
    "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview",
    "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview",
  ],
  "Power-BI": [
    "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview",
    "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview",
    "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview",
    "https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview",
    "https://docs.google.com/presentation/d/1MJ3TsDgAN31f-UviHIYJZN-52GL8e_Hh/preview",
  ],
         };

          setTopics(
          (backups[id] || []).map((link, idx) => ({
            name: `${id} Backup PPT ${idx + 1}`,
            url: link,
          }))
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
  if (topics.length > 0 && selectedTopic === null) {
    setSelectedTopic(0); // automatically select first topic for mobile
  }
}, [topics]);


  // Handle sidebar resize
  useEffect(() => {
    const handleResize = () => {
      setIsTopicsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="text-center mt-16">Loading materials...</p>;
    
console.log("id:", id, "topics:", topics, "selectedTopic:", selectedTopic);

  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-purple-950">{id} Course</h1>

        {/* ---------------- DESKTOP VIEW ---------------- */}
        <div className="hidden lg:flex">
          {/* Sidebar */}
          <div
            className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white shadow-md z-40 transition-all duration-300 ${
              isTopicsSidebarOpen ? "w-64" : "w-0 lg:w-64 lg:block hidden"
            } overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="font-semibold text-purple-950 text-lg mb-3">Topics</h2>
              <ul className="space-y-2">
                {topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className={`p-2 rounded-md bg-gray-100 hover:bg-purple-200 text-black cursor-pointer ${
                      selectedTopic === idx ? "bg-purple-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedTopic(idx);
                      setShowPPT(false);
                      setActiveTab("study");
                    }}
                  >
                    {topic.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white text-purple-950 rounded-lg shadow-md p-4 lg:ml-6">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b pb-2">
              {["study", "interview", "assignments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-t-md font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-purple-950 hover:bg-gray-300"
                  }`}
                >
                  {tab === "study" && "Study Materials"}
                  {tab === "interview" && "Interview Questions"}
                  {tab === "assignments" && "Assignments"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "study" && selectedTopic !== null && (
              <div>
                <div
                  className="cursor-pointer bg-purple-100 hover:bg-purple-200 p-2 rounded-md shadow-md mb-4"
                  onClick={() => setShowPPT(!showPPT)}
                >
                  <h2 className="font-semibold text-lg mb-0">{topics[selectedTopic].name}</h2>
                  <p className="text-sm text-gray-700">
                    {showPPT ? "Click to hide PPT" : "Click to view PPT"}
                  </p>
                </div>
                {showPPT && (
                  <div className="relative w-full h-[400px] flex items-center overflow-hidden">
                    <button
                      className="absolute left-0 z-10 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
                      onClick={() => scrollContent(-1)}
                    >
                      &lt;
                    </button>
                    <div ref={scrollRef} className="flex overflow-x-auto h-full w-full scroll-smooth no-scrollbar">
                      <iframe
                        src={topics[selectedTopic].url}
                        className="flex-shrink-0 w-full h-full mx-2 rounded-md border"
                        key={selectedTopic}
                      ></iframe>
                    </div>
                    <button
                      className="absolute right-0 z-10 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
                      onClick={() => scrollContent(1)}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "interview" && (
              <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
                {currentQuestionIndex < interviewQuestions.length ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Question {currentQuestionIndex + 1}:
                    </h2>
                    <p className="mb-4">{interviewQuestions[currentQuestionIndex].question}</p>
                    <div className="space-y-2">
                      {interviewQuestions[currentQuestionIndex].options.map((opt, idx) => {
                         const correctIndex = interviewQuestions[currentQuestionIndex].correct!;
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === correctIndex;
                        return (
                        <label
                          key={idx}
                          className={`block p-3 border rounded-md cursor-pointer hover:bg-purple-50 
                             ${isSelected && !isCorrect ? "bg-red-200 border-red-400" : ""}
                              ${isCorrect ? "bg-green-200 border-green-400" : ""}
                              hover:bg-purple-50`}
                        >
                          <input
                            type="radio"
                            name="option"
                            value={idx}
                            checked={selectedOption === idx}
                            onChange={() => setSelectedOption(idx)}
                            className="mr-2"
                          />
                          {opt}
                        </label>
                        );
})}
                    </div>
                    <button
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                    <p className="mt-2">You have answered all questions.</p>
                  </div>
                )}
              </div>
            )}

   {activeTab === "assignments" && selectedTopic !== null && topics[selectedTopic]?.assignments?.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {topics[selectedTopic].assignments?.map((link, idx) => (
      <a
        key={idx}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="block p-4 border rounded-md shadow hover:bg-purple-50 transition"
      >
        Download Assignment {idx + 1}
      </a>
    ))}
  </div>
)}

          </div>
        </div>

        {/* ---------------- MOBILE VIEW ---------------- */}
        <div className="block lg:hidden space-y-4">
          {["study", "interview", "assignments"].map((tab) => (
            <div key={tab} className="border rounded-md shadow">
              <button
                onClick={() => setActiveTab(activeTab === tab ? ("none" as any) : (tab as any))}
                className={`w-full text-left p-4 font-semibold ${
                  tab === "study"
                    ? "bg-purple-100 hover:bg-purple-200"
                    : tab === "interview"
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-purple-100 hover:bg-purple-200"
                }`}
              >
                {tab === "study" && "📘 Study Materials"}
                {tab === "interview" && "❓ Interview Questions"}
                {tab === "assignments" && "📝 Assignments"}
              </button>

              {activeTab === tab && (
                <div className="p-4">
                  {tab === "study" && selectedTopic !== null && (
                    <div className="relative w-full h-[60vh] flex items-center overflow-hidden">
                      <button
                        className="absolute left-2 z-10 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
                        onClick={() =>
                          setSelectedTopic((prev) => (prev! - 1 + topics.length) % topics.length)
                        }
                      >
                        &lt;
                      </button>
                      <div ref={scrollRef} className="flex overflow-x-auto h-full w-full scroll-smooth no-scrollbar">
                      <iframe
                        src={topics[selectedTopic].url.includes("/preview") ? topics[selectedTopic].url : topics[selectedTopic].url + "/preview"}
                        className="w-full h-full rounded-md border"
                        allowFullScreen
                      ></iframe>
                      </div>
                      <button
                        className="absolute right-2 z-10 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
                        onClick={() =>
                          setSelectedTopic((prev) => (prev! + 1) % topics.length)
                        }
                      >
                        &gt;
                      </button>
                    </div>
                  )}

                  {tab === "interview" && (
                    <div>
                      {currentQuestionIndex < interviewQuestions.length ? (
                        <div>
                          <h2 className="text-lg font-semibold mb-4">
                            Question {currentQuestionIndex + 1}:
                          </h2>
                          <p className="mb-4">{interviewQuestions[currentQuestionIndex].question}</p>
                          <div className="space-y-2">
                            {interviewQuestions[currentQuestionIndex].options.map((opt, idx) => {
                               const correctIndex = interviewQuestions[currentQuestionIndex].correct!;
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === correctIndex;
                        return (
                              <label
                                key={idx}
                                className={`block p-3 border rounded-md cursor-pointer hover:bg-purple-50 
                                 ${isSelected && !isCorrect ? "bg-red-200 border-red-400" : ""}
                              ${isCorrect ? "bg-green-200 border-green-400" : ""}
                              hover:bg-purple-50
                                `}
                              >
                                <input
                                  type="radio"
                                  name="option"
                                  value={idx}
                                  checked={selectedOption === idx}
                                  onChange={() => setSelectedOption(idx)}
                                  className="mr-2"
                                />
                                {opt}
                              </label>
                        );
})}
                          </div>
                          <button
                            disabled={selectedOption === null}
                            onClick={handleSubmitAnswer}
                            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                          <p className="mt-2">You have answered all questions.</p>
                        </div>
                      )}
                    </div>
                  )}

                 {tab === "assignments" && selectedTopic !== null && topics[selectedTopic]?.assignments?.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {topics[selectedTopic].assignments?.map((link, idx) => (
      <a
        key={idx}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="block p-4 border rounded-md shadow hover:bg-purple-50 transition"
      >
        Download Assignment {idx + 1}
      </a>
    ))}
  </div>
)}

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
