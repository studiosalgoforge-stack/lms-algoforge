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
    question: "What does SQL stand for?",
    options: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "Sequential Query Language"],
    correct: 1
  },
  {
    question: "Which SQL statement is used to retrieve data from a database?",
    options: ["UPDATE", "DELETE", "INSERT", "SELECT"],
    correct: 3
  },
  {
    question: "What is a primary key in SQL?",
    options: [
      "A key that can have duplicate values",
      "A unique identifier for each record in a table",
      "A key used only for foreign relationships",
      "A key that can contain NULL values"
    ],
    correct: 1
  },
  {
    question: "Which SQL clause is used to filter the results of a query?",
    options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
    correct: 2
  },
  {
    question: "Which function is used to find the maximum value in SQL?",
    options: ["UPPER()", "TOP()", "MAX()", "COUNT()"],
    correct: 2
  },
  {
    question: "What does the DISTINCT keyword do in SQL?",
    options: ["Sorts the result set", "Removes duplicate rows from the result", "Counts the number of rows", "Groups rows by a column"],
    correct: 1
  },
  {
    question: "Which SQL command is used to create a new table?",
    options: ["CREATE", "ALTER", "DROP", "TRUNCATE"],
    correct: 0
  },
  {
    question: "What is the purpose of the GROUP BY clause in SQL?",
    options: [
      "To sort the result set",
      "To filter individual rows",
      "To group rows that have the same values in specified columns",
      "To limit the number of rows returned"
    ],
    correct: 2
  },
  {
    question: "Which type of JOIN returns all records from both tables, with NULLs where there is no match?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correct: 3
  },
  {
    question: "Which SQL function counts the number of rows in a result set?",
    options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
    correct: 1
  },
  {
    question: "What does the UPDATE command in SQL do?",
    options: ["Deletes a record", "Modifies an existing record", "Adds a new record", "Retrieves data"],
    correct: 1
  },
  {
    question: "Which clause is used to filter grouped results in SQL?",
    options: ["WHERE", "ORDER BY", "HAVING", "GROUP BY"],
    correct: 2
  },
  {
    question: "What is a foreign key in SQL?",
    options: [
      "A key that uniquely identifies each record",
      "A key that references the primary key of another table",
      "A key that cannot have NULL values",
      "A key used for sorting data"
    ],
    correct: 1
  },
  {
    question: "Which SQL command is used to add a new record to a table?",
    options: ["SELECT", "DELETE", "UPDATE", "INSERT"],
    correct: 3
  },
  {
    question: "What does an INNER JOIN do in SQL?",
    options: [
      "Returns all records from the left table",
      "Returns all records from the right table",
      "Returns only the records that have matching values in both tables",
      "Returns all records from both tables"
    ],
    correct: 2
  },
  {
    question: "Which SQL function calculates the average value of a column?",
    options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
    correct: 2
  },
  {
    question: "What is a subquery in SQL?",
    options: ["A query that modifies data", "A query within another query", "A query that creates tables", "A query that deletes data"],
    correct: 1
  },
  {
    question: "Which SQL data type is used to store true or false values?",
    options: ["INT", "BOOLEAN", "VARCHAR", "FLOAT"],
    correct: 1
  },
  {
    question: "What does the ORDER BY clause do in SQL?",
    options: [
      "Groups rows by column values",
      "Filters rows based on conditions",
      "Sorts the result set in ascending or descending order",
      "Counts the number of rows"
    ],
    correct: 2
  },
  {
    question: "Which command is used to remove a specific record from a table in SQL?",
    options: ["DELETE", "UPDATE", "INSERT", "SELECT"],
    correct: 0
  }

  ],
 "Power-BI": [
  {
    "question": "What is the primary purpose of Power BI?",
    "options": [
      "To manage relational databases",
      "To create and visualize interactive business intelligence reports and dashboards",
      "To develop cloud-based applications",
      "To perform machine learning model training"
    ],
    "correct": 1
  },
  {
    "question": "Which company developed Power BI?",
    "options": ["Google", "IBM", "Microsoft", "Oracle"],
    "correct": 2
  },
  {
    "question": "What is the primary file format used to save Power BI reports?",
    "options": [".xls", ".pbix", ".csv", ".docx"],
    "correct": 1
  },
  {
    "question": "Which Power BI component is used to build reports?",
    "options": ["Power BI Desktop", "Power BI Service", "Power BI Mobile", "Power Query"],
    "correct": 0
  },
  {
    "question": "What is Power Query used for in Power BI?",
    "options": ["Data visualization", "Data transformation", "Data analysis", "Data modeling"],
    "correct": 1
  },
  {
    "question": "Which language is used for creating calculations in Power BI?",
    "options": ["SQL", "JavaScript", "DAX (Data Analysis Expressions)", "Python"],
    "correct": 2
  },
  {
    "question": "What is the purpose of Power BI's Q&A feature?",
    "options": [
      "Querying and visualizing data",
      "Automating data refresh",
      "Creating reports",
      "Asking questions in natural language and getting answers"
    ],
    "correct": 3
  },
  {
    "question": "Which of the following is NOT a data visualization tool in Power BI?",
    "options": ["Bar Chart", "Line Chart", "Pie Chart", "Data Table"],
    "correct": 3
  },
  {
    "question": "What symbol would you use for multiplication in Power BI in a DAX formula?",
    "options": ["+", "-", "/", "*"],
    "correct": 3
  },
  {
    "question": "Which feature in Power BI allows you to schedule automatic refreshes of your dataset?",
    "options": ["Power Query", "Power Pivot", "Power Automate", "Dataset Refresh"],
    "correct": 3
  },
  {
    "question": "What is the main advantage of using Power BI over Excel for reporting?",
    "options": [
      "Limited visualization options",
      "Real-time data connectivity",
      "Less user control over data",
      "Smaller file sizes"
    ],
    "correct": 1
  },
  {
    "question": "Which of the following is NOT a valid data source in Power BI?",
    "options": ["Excel", "Salesforce", "Twitter", "Paper Documents"],
    "correct": 3
  },
  {
    "question": "What is the purpose of Power BI's Drillthrough feature?",
    "options": [
      "Creating custom visualizations",
      "Filtering data in reports",
      "Navigating to more detailed data from summarized data",
      "Exporting reports to different formats"
    ],
    "correct": 2
  },
  {
    "question": "Which type of visual in Power BI is used to display hierarchical data in a tree-like structure?",
    "options": ["Bar Chart", "Line Chart", "Treemap", "Scatter Chart"],
    "correct": 2
  },
  {
    "question": "What is the purpose of Power BI's Row-level security feature?",
    "options": ["Encrypting data", "Filtering data based on user roles", "Analyzing data trends", "Creating calculated columns"],
    "correct": 1
  },
  {
    "question": "Which M Language function is used to remove duplicates from a table in Power Query?",
    "options": ["Table.Distinct", "Table.Remove", "Table.Clean", "Table.Filter"],
    "correct": 0
  },
  {
    "question": "What creates the connection between Power BI cloud-based data and the data source located on-premises?",
    "options": ["Report view", "Query editor", "Power BI service", "Gateway"],
    "correct": 3
  },
  {
    "question": "Which type of visualization is best for showing trends over time?",
    "options": ["Pie chart", "Line chart", "Bar chart", "Scatter plot"],
    "correct": 1
  },
  {
    "question": "What is the maximum data limit per client for the free version of Power BI?",
    "options": ["500 MB", "1 GB", "2 GB", "10 GB"],
    "correct": 1
  },
  {
    "question": "Which DAX function can be used to return a value in a column if a condition is met?",
    "options": ["IF", "VLOOKUP", "SUM", "COUNT"],
    "correct": 0
  }
],


 "Data-Engineering": [
  {
    question: "What is Apache Kafka primarily used for?",
    options: ["Batch processing", "Real-time event streaming", "Data storage", "Data visualization"],
    correct: 1
  },
  {
    question: "In Kafka, what is a topic?",
    options: ["A consumer group", "A category or feed name to which records are published", "A broker node", "A partition"],
    correct: 1
  },
  {
    question: "What is a partition in Kafka?",
    options: ["A consumer group subset", "A division of a topic for scalability and parallelism", "A zookeeper node", "A broker log directory"],
    correct: 1
  },
  {
    question: "Which component coordinates and manages Kafka brokers?",
    options: ["Producer", "Consumer", "ZooKeeper", "Connect"],
    correct: 2
  },
 {
    question: "Which NiFi component defines reusable flow fragments?",
    options: ["Controller Service", "Template", "Process Group", "Controller"],
    correct: 1
  },
  {
    question: "Which Airflow operator would you use to run a Bash command?",
    options: ["BashOperator", "PythonOperator", "MySqlOperator", "DockerOperator"],
    correct: 0
  },
  {
    question: "What is a NiFi flowfile?",
    options: ["Configuration file", "Unit of data with content and attributes", "Log file", "Template file"],
    correct: 1
  },
  {
    question: "Which Airflow feature allows parameterizing DAG runs?",
    options: ["Variables", "Connections", "XComs", "Pools"],
    correct: 0
  },
  {
    question: "How can NiFi be scaled horizontally?",
    options: ["Adding more disks", "Clustered NiFi nodes behind a load balancer", "Increasing JVM heap size", "Using NiFi on Kubernetes only"],
    correct: 1
  },
  {
    question: "Which Airflow component stores metadata about DAGs and task instances?",
    options: ["Metadata Database", "Redis", "ZooKeeper", "Kafka"],
    correct: 0
  },
  {
    question: "What is the entry point for Spark SQL and DataFrame API?",
    options: ["SparkContext", "SparkSession", "SQLContext", "HiveContext"],
    correct: 1
  },
  {
    question: "Which of the following is a common use case for GraphX?",
    options: ["SQL queries", "Graph-parallel computations", "Real-time analytics", "Machine learning"],
    correct: 1
  },
  {
    question: "Which action writes a DataFrame to external storage?",
    options: ["df.show()", "df.write()", "df.save()", "df.write.format()"],
    correct: 3
  },
  {
    question: "What is the main advantage of using Spark over Hadoop MapReduce?",
    options: ["Better storage", "Faster in-memory processing", "Simpler code", "Lower cost"],
    correct: 1
  },
  {
    question: "Which consistency model allows reads to return stale data temporarily?",
    options: ["Strong consistency", "Sequential consistency", "Eventual consistency", "Linearizable consistency"],
    correct: 2
  },
  {
    question: "What is denormalization in NoSQL database design?",
    options: ["Converting normalized data to first normal form", "Storing redundant data to optimize read performance", "Removing all duplicate data", "Creating foreign key relationships"],
    correct: 1
  },
  {
    question: "Which Apache project provides a distributed streaming platform?",
    options: ["Hadoop", "Spark", "Kafka", "Hive"],
    correct: 2
  },
  {
    question: "Which principle is central to a data mesh architecture?",
    options: ["Centralized governance", "Domain-oriented ownership", "Single data platform", "Batch processing"],
    correct: 1
  },
  {
    question: "What is a characteristic of a hub-and-spoke data architecture?",
    options: ["Peer-to-peer data flow", "Central hub and distributed endpoints", "Domain data products", "Unified streaming bus"],
    correct: 1
  },
  {
    question: "Which architecture style is optimized for low-latency analytical queries on large datasets?",
    options: ["Data vault", "Star schema", "Snowflake schema", "OLTP"],
    correct: 2
  },
  {
    question: "In a microservices-based data architecture, data is typically managed by:",
    options: ["A single database", "Independent service-specific databases", "Data lake only", "Centralized data warehouse"],
    correct: 1
  },
  {
    question: "Which practice ensures the pipeline can recover from failures?",
    options: ["Idempotency", "Overprovisioning", "Data masking", "Caching"],
    correct: 0
  },
  {
    question: "What is the role of a data warehouse in a pipeline?",
    options: ["Data ingestion", "Data storage optimized for analysis and reporting", "Event streaming", "Schema inference"],
    correct: 1
  },
  {
    question: "Which metric measures the freshness of data in a pipeline?",
    options: ["Throughput", "Latency", "Accuracy", "Redundancy"],
    correct: 1
  },
  {
    question: "Which concept describes storing only new changes to data rather than full reloads?",
    options: ["Full ingestion", "Incremental loading", "Bulk export", "Cold start"],
    correct: 1
  },
  {
    question: "Which tool integrates with cloud AutoML for CI/CD of ML models?",
    options: ["Jenkins", "DVC", "Kubeflow Pipelines", "Apache Airflow"],
    correct: 2
  },
  {
    question: "Why is monitoring important in ML pipelines?",
    options: ["To retrain data", "To ensure model performance and detect drift", "To label data", "To schedule pipelines"],
    correct: 1
  },
  {
    question: "Which function concatenates DataFrames along a particular axis?",
    options: ["df.append()", "pd.concat()", "df.join()", "pd.stack()"],
    correct: 1
  },
  {
    question: "Which method is used to pivot a DataFrame?",
    options: ["df.rotate()", "df.pivot()", "df.transpose()", "df.swapaxes()"],
    correct: 1
  },
  {
    question: "Which Dataflow runner is native to GCP?",
    options: ["DirectRunner", "FlinkRunner", "DataflowRunner", "SparkRunner"],
    correct: 2
  },
  {
    question: "Which mechanism helps in scaling out streaming consumers in Pub/Sub?",
    options: ["Horizontal Pod Autoscaler", "Subscription sharding with multiple subscribers", "Manual scaling only", "Partition keys"],
    correct: 1
  },
  {
    question: "Which class is used to read streams in Structured Streaming?",
    options: ["SparkSession.read", "SparkSession.readStream", "SparkContext.stream", "SQLContext.stream"],
    correct: 1
  },
  {
    question: "Which trigger controls the execution frequency in Structured Streaming?",
    options: ["processingTime", "eventTime", "once", "continuous"],
    correct: 0
  }
],

"Tableau":[
  {
    "question": "What is Tableau and why is it used?",
    "options": [
      "A programming language for data analysis.",
      "A database for storing large datasets.",
      "A data visualization tool used for business intelligence.",
      "An ETL tool for data migration."
    ],
    "correct": 2
  },
  {
    "question": "What is a 'live' connection in Tableau?",
    "options": [
      "A connection to a static file like Excel.",
      "A real-time connection that queries the data source directly.",
      "A connection that imports all data into Tableau's memory.",
      "A connection that requires manual refreshing."
    ],
    "correct": 1
  },
  {
    "question": "Explain the difference between a 'Join' and a 'Blend' in Tableau.",
    "options": [
      "Joins are for flat files, Blends are for databases.",
      "Joins combine data at the row level, Blends aggregate data from different sources at a higher level.",
      "Joins are faster than Blends.",
      "Blends can only be used with two data sources."
    ],
    "correct": 1
  },
  {
    "question": "What is a 'Calculated Field' in Tableau?",
    "options": [
      "A field that is automatically generated by Tableau.",
      "A field created by the user to perform calculations on existing data.",
      "A field used only for sorting data.",
      "A field that can only contain numbers."
    ],
    "correct": 1
  },
  {
    "question": "What is a 'Dashboard' in Tableau?",
    "options": [
      "A single chart used for data exploration.",
      "A workbook containing only one worksheet.",
      "A collection of multiple worksheets and visualizations on a single page.",
      "A table of raw data."
    ],
    "correct": 2
  },
  {
    "question": "What are 'Tableau Extracts'?",
    "options": [
      "Connections to live data sources.",
      "A full copy of a data source that is saved in a Tableau file.",
      "A way to automatically refresh data.",
      "Temporary data files created during a session."
    ],
    "correct": 1
  },
  {
    "question": "What are 'Filters' in Tableau?",
    "options": [
      "A way to change the color of a visualization.",
      "A feature to combine data from different sources.",
      "A tool to exclude or include specific data points in a view.",
      "A type of calculated field."
    ],
    "correct": 2
  },
  {
    "question": "What is the primary function of a 'Parameter' in Tableau?",
    "options": [
      "To automatically refresh a dashboard.",
      "To combine multiple data sources.",
      "To create a dynamic value that can be controlled by the user.",
      "To filter data based on fixed criteria."
    ],
    "correct": 2
  },
  {
    "question": "How can you optimize a slow dashboard in Tableau?",
    "options": [
      "Use more filters and complex calculations.",
      "Use data extracts, reduce the number of marks, and optimize calculated fields.",
      "Add more visualizations to the dashboard.",
      "Connect to the slowest data source available."
    ],
    "correct": 1
  },
  {
    "question": "What is a 'Story' in Tableau?",
    "options": [
      "A single visualization.",
      "A way to present a series of visualizations in a sequence to tell a narrative.",
      "A type of data source.",
      "A tool for cleaning data."
    ],
    "correct": 1
  }
],


"Big-Data": [
    {
      "question": "Which component in the Hadoop ecosystem is primarily used for storing large datasets across a cluster of commodity hardware?",
      "options": ["MapReduce", "Spark", "HDFS", "YARN"],
      "correct": 2
    },
    {
      "question": "What is the primary function of YARN (Yet Another Resource Negotiator) in a Hadoop cluster?",
      "options": ["Data ingestion from relational databases", "Resource management and job scheduling", "Providing a SQL interface for querying data", "Real-time stream processing"],
      "correct": 1
    },
    {
      "question": "Which of the following describes the fundamental processing model used by Spark, differentiating it from traditional MapReduce?",
      "options": ["Disk-based processing", "In-memory processing", "Queue-based processing", "Single-threaded processing"],
      "correct": 1
    },
    {
      "question": "Which Spark abstraction represents an immutable, partitioned collection of records that can be operated on in parallel?",
      "options": ["DataFrame", "RDD", "Dataset", "Spark Context"],
      "correct": 1
    },
    {
      "question": "Hive is primarily used for which purpose in the Hadoop ecosystem?",
      "options": ["Real-time NoSQL storage", "Streaming data ingestion", "Providing a SQL-like interface for querying data in HDFS", "In-memory machine learning"],
      "correct": 2
    },
    {
      "question": "What is the component that Hive uses to store the metadata (schema, tables, partitions) of its tables?",
      "options": ["Hive Server", "Hive Client", "Hive Metastore", "HBase Region Server"],
      "correct": 2
    },
    {
      "question": "HBase is a NoSQL database built on top of HDFS. What is its data model based on?",
      "options": ["Key-Value pairs", "Document store", "Column-oriented store", "Graph database"],
      "correct": 2
    },
    {
      "question": "Which characteristic best describes HBase's data retrieval capabilities?",
      "options": ["Batch processing only", "Low-latency random read/write access", "High-latency sequential access", "SQL-based complex joins"],
      "correct": 1
    },
    {
      "question": "What is the primary role of Apache Sqoop?",
      "options": ["To transfer data between Hadoop and relational databases", "To write complex ETL jobs using a scripting language", "To manage and schedule workflows in Hadoop", "To analyze log data in real-time"],
      "correct": 0
    },
    {
      "question": "To export data from HDFS back to a MySQL table, which tool is most appropriate?",
      "options": ["Pig", "Hive", "Sqoop", "Flume"],
      "correct": 2
    },
    {
      "question": "Apache Pig is a platform for analyzing large datasets. What is the language used to write Pig scripts?",
      "options": ["SQL", "Java", "Pig Latin", "Scala"],
      "correct": 2
    },
    {
      "question": "What is a major advantage of using Pig over writing complex raw MapReduce jobs in Java?",
      "options": ["Pig executes much faster than Java MapReduce", "Pig allows for procedural data flow and is simpler to code", "Pig can only process streaming data", "Pig does not require HDFS"],
      "correct": 1
    },
    {
      "question": "In a traditional data pipeline, which scenario is best suited for using MySQL?",
      "options": ["Storing petabytes of unstructured clickstream data", "Storing the structured, normalized relational data (e.g., customer profiles, order details)", "Running real-time graph algorithms", "Performing complex ETL on terabytes of raw log files"],
      "correct": 1
    },
    {
      "question": "Which SQL command is used in MySQL to retrieve records that match a specified condition?",
      "options": ["UPDATE", "INSERT", "SELECT", "DELETE"],
      "correct": 2
    },
    {
      "question": "In the context of Spark, what is the meaning of 'lazy evaluation'?",
      "options": ["Data is loaded into memory immediately after a transformation is called", "Transformations are executed only when an action (like `count()` or `collect()`) is called", "The entire program is compiled before any transformation", "It refers to the automatic caching of intermediate results"],
      "correct": 1
    }
  ]


};
