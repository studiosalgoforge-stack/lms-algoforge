export interface InterviewQuestion {
  question: string;
  options: string[];
  correct: number;
}

export const interviewData: Record<string, InterviewQuestion[]> = {
  "Data-Science": [
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
  ],
  SQL: [
    {
      question: "What is a primary key in SQL?",
      options: [
        "A column that uniquely identifies a row",
        "A column that allows duplicate values",
        "A backup column",
        "A random identifier",
      ],
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

  ],
  "Power-BI": [
    {
      question: "Power BI is mainly used for?",
      options: ["Data Entry", "Data Visualization", "Database Design", "Machine Learning"],
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
  ],
};
