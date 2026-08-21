// The ordered learning catalogue for the fictional Qubix Superstore world.
// Listing a topic does not approve or generate a board. Every topic still
// requires its own source, prerequisite, interaction and founder-review gate.

export const superstoreTopics = [
  {
    phase: 0,
    title: 'Pre-Intern academy · starting from zero',
    role: 'Pre-Intern Candidate',
    topics: [
      'What data is and why people use it', 'What a computer program does',
      'Keyboard, mouse, touch and accessibility basics', 'Files, folders and file extensions',
      'Opening, saving, copying and finding a file', 'Web browsers, links and safe downloads',
      'Accounts, passwords and multifactor authentication', 'Plain text, documents and spreadsheets',
      'Rows, columns and simple tables', 'Reading labels, numbers and dates',
      'Using a calculator carefully', 'Following a multi-step instruction',
      'Checking work instead of guessing', 'Breaking a problem into smaller questions',
      'Recognising patterns', 'Explaining an answer in plain language',
      'Asking useful questions', 'Learning from feedback and mistakes',
      'Digital privacy and personal information', 'Academic honesty and source attribution',
      'Study habits and spaced practice', 'No-code introduction to the Qubix Superstore'
    ],
    practical: 'Navigate the Superstore learning desk, open a synthetic branch file, identify its labels and explain what help is needed.'
  },
  {
    phase: 1,
    title: 'Enterprise and data orientation',
    role: 'Pre-Intern Candidate',
    topics: [
      'How a multi-branch retailer operates', 'Corporate office and branch responsibilities',
      'Operational systems versus analytical systems', 'Business questions and decisions',
      'Data roles and career routes', 'Data lifecycle', 'Data ownership and stewardship',
      'Observation grain', 'Records, fields and values', 'Identifiers and business keys',
      'Synthetic data and safe practice', 'Documentation and evidence'
    ],
    practical: 'Trace one branch event from the operational system to a corporate decision.'
  },
  {
    phase: 2,
    title: 'Mathematical foundations',
    role: 'Pre-Intern Candidate',
    topics: [
      'Whole numbers and signed numbers', 'Fractions, decimals and percentages',
      'Ratios, rates and proportions', 'Units and dimensional reasoning',
      'Powers, roots and scientific notation', 'Algebraic expressions', 'Equations and inequalities',
      'Variables and functions', 'Coordinate planes and graphs', 'Lines and slope',
      'Sequences and growth', 'Exponents and logarithms', 'Summation notation',
      'Approximation, rounding and numerical error'
    ],
    practical: 'Reconcile a branch metric, convert its units and explain every calculation.'
  },
  {
    phase: 3,
    title: 'Data literacy and measurement',
    role: 'Pre-Intern Candidate · capstone',
    topics: [
      'Cases and observations', 'Variables and values', 'Rows, columns and cells',
      'Units of observation and analysis', 'Categorical and quantitative data',
      'Nominal, ordinal, interval and ratio scales', 'Discrete and continuous variables',
      'Dates, times and durations', 'Missing values', 'Zeros versus missingness',
      'Duplicates', 'Validity and consistency', 'Accuracy and precision',
      'Measurement error', 'Bias in data collection', 'Metadata', 'Data lineage',
      'Data quality dimensions', 'Privacy, consent and minimisation'
    ],
    practical: 'Validate and repair the daily branch feed without inventing or deleting evidence.'
  },
  {
    phase: 4,
    title: 'Descriptive statistics and visualisation',
    role: 'Data Intern',
    topics: [
      'Frequency and relative frequency', 'Distributions and empirical shape',
      'Frequency tables', 'Bar charts and histograms', 'Line charts and time plots',
      'Scatter plots', 'Mean, median and mode', 'Range and interquartile range',
      'Variance and standard deviation', 'Quantiles and percentiles', 'Standard scores',
      'Skewness and tails', 'Outliers and influential values', 'Covariance and correlation',
      'Grouped summaries', 'Comparing distributions', 'Exploratory data analysis',
      'Chart selection', 'Misleading charts', 'Communicating uncertainty'
    ],
    practical: 'Build the morning operations brief and explain branch variation instead of hiding it.'
  },
  {
    phase: 5,
    title: 'Probability and uncertainty',
    role: 'Statistical Analyst',
    topics: [
      'Random processes and outcomes', 'Sample spaces and events', 'Complements, unions and intersections',
      'Probability axioms', 'Counting rules', 'Permutations and combinations',
      'Conditional probability', 'Independence', 'Law of total probability', "Bayes' theorem",
      'Random variables', 'Probability mass and density', 'Cumulative distributions',
      'Expected value', 'Variance of a random variable', 'Bernoulli and binomial distributions',
      'Geometric and Poisson distributions', 'Uniform, normal and exponential distributions',
      'Joint and marginal distributions', 'Covariance and dependence', 'Law of large numbers',
      'Central limit theorem', 'Monte Carlo simulation', 'Random seeds and reproducibility'
    ],
    practical: 'Simulate stockout and delivery risk, then compare the simulation with probability theory.'
  },
  {
    phase: 6,
    title: 'Sampling, inference and experimentation',
    role: 'Experimentation Analyst',
    topics: [
      'Populations, samples and sampling frames', 'Random, stratified and cluster sampling',
      'Sampling bias and nonresponse', 'Statistics, parameters and estimators',
      'Sampling distributions', 'Standard error', 'Point estimation', 'Confidence intervals',
      'Bootstrap methods', 'Null and alternative hypotheses', 'Test statistics', 'P-values',
      'Type I and type II errors', 'Effect size', 'Statistical power', 'Sample-size planning',
      'Multiple comparisons', 'Practical versus statistical significance',
      'Observational studies and experiments', 'Random assignment', 'Controls and blinding',
      'Confounding', 'Correlation and causation', 'A/B testing', 'Sequential testing',
      'Pre-registration and metric guardrails'
    ],
    practical: 'Design and evaluate a promotion experiment with declared metrics and stopping rules.'
  },
  {
    phase: 7,
    title: 'Relational data and SQL',
    role: 'Data Analyst',
    topics: [
      'Relational tables and schemas', 'Primary and foreign keys', 'Cardinality',
      'One-to-one, one-to-many and many-to-many relationships', 'Entity-relationship models',
      'Normalization and denormalization', 'SELECT, WHERE and ORDER BY',
      'Calculated columns and CASE', 'NULL semantics', 'Aggregations and GROUP BY',
      'HAVING', 'Inner, outer and cross joins', 'Join grain and fanout', 'Subqueries',
      'Common table expressions', 'Set operations', 'Window functions', 'Date and string functions',
      'Views and materialized views', 'Transactions and consistency', 'Indexes',
      'Query plans and performance', 'SQL testing and reconciliation'
    ],
    practical: 'Join sales, products, branches and calendar data without changing the intended grain.'
  },
  {
    phase: 8,
    title: 'Python and analytical computing',
    role: 'Data Analyst',
    topics: [
      'Python values and types', 'Variables and expressions', 'Collections', 'Conditions and loops',
      'Functions and modules', 'Errors and exceptions', 'Files and paths', 'Virtual environments',
      'Git and version control', 'Testing and assertions', 'NumPy arrays and vectorisation',
      'pandas Series and DataFrames', 'Reading CSV, JSON and database data',
      'Selecting, filtering and sorting', 'Grouping and aggregation', 'Merging and reshaping',
      'Missing-data operations', 'Dates and time series', 'Data cleaning',
      'Exploratory analysis', 'Statistical graphics', 'Notebooks and reproducible reports',
      'Performance and memory basics'
    ],
    practical: 'Create a tested, reproducible branch-performance analysis from raw extracts.'
  },
  {
    phase: 9,
    title: 'Business intelligence and decision analytics',
    role: 'BI and Operations Analyst',
    topics: [
      'Business metric definitions', 'Dimensions, facts and grain', 'Star schemas',
      'Slowly changing dimensions', 'Semantic layers', 'Dashboard information hierarchy',
      'Filters, drill-down and comparison', 'Targets and benchmarks', 'Cohort analysis',
      'Funnels and conversion', 'Retention and repeat behaviour', 'Segmentation',
      'Same-store comparisons', 'Promotion performance', 'Inventory and stockout metrics',
      'Supplier service levels', 'Labour and productivity metrics', 'Finance and margin metrics',
      'Metric ownership', 'Data storytelling', 'Decision memos and recommendations'
    ],
    practical: 'Publish a governed executive dashboard whose numbers reconcile to source records.'
  },
  {
    phase: 10,
    title: 'Analytics engineering and data modelling',
    role: 'Analytics Engineer',
    topics: [
      'Source, staging, intermediate and mart layers', 'Dimensional modelling',
      'Fact table types', 'Conformed dimensions', 'Surrogate keys', 'Snapshots and event tables',
      'Incremental models', 'Late-arriving data', 'Historical corrections', 'Schema contracts',
      'Transformation testing', 'Freshness and completeness tests', 'Documentation generation',
      'Metric layers', 'Dependency graphs', 'Code review', 'Deployment environments',
      'Reproducible builds', 'Cost-aware transformations'
    ],
    practical: 'Build and test a governed sales-and-inventory mart for every downstream team.'
  },
  {
    phase: 11,
    title: 'Data engineering and platform reliability',
    role: 'Data Engineer',
    topics: [
      'Data architecture', 'OLTP and OLAP systems', 'Warehouses, lakes and lakehouses',
      'File formats and partitioning', 'ETL and ELT', 'Batch and stream processing',
      'Message queues and event logs', 'APIs and ingestion', 'Change data capture',
      'Workflow orchestration', 'Idempotency and retries', 'Backfills', 'Schema evolution',
      'Data contracts', 'Quality gates', 'Observability and alerting', 'Lineage systems',
      'Access control and secrets', 'Encryption and retention', 'Performance and cost',
      'Service-level objectives', 'Incident response and postmortems'
    ],
    practical: 'Operate the inventory pipeline through late data, schema change and upstream failure.'
  },
  {
    phase: 12,
    title: 'Mathematics for machine learning',
    role: 'Junior Data Scientist',
    topics: [
      'Vectors and vector spaces', 'Matrices and tensors', 'Matrix operations',
      'Linear transformations', 'Systems of linear equations', 'Rank and independence',
      'Dot products, norms and distance', 'Projections', 'Eigenvalues and eigenvectors',
      'Singular value decomposition', 'Derivatives and partial derivatives', 'Gradients',
      'Chain rule', 'Multivariable calculus', 'Loss functions', 'Gradient descent',
      'Convexity', 'Constraints and regularisation', 'Numerical stability'
    ],
    practical: 'Derive and visualise the optimisation steps of a small retail prediction model.'
  },
  {
    phase: 13,
    title: 'Machine learning and data science',
    role: 'Data Scientist',
    topics: [
      'Problem framing and target definition', 'Training, validation and test splits',
      'Temporal validation', 'Baselines', 'Feature engineering', 'Encoding and scaling',
      'Missing-data strategies', 'Linear regression', 'Logistic regression',
      'k-nearest neighbours', 'Decision trees', 'Random forests', 'Gradient boosting',
      'Support vector machines', 'Clustering', 'Principal component analysis',
      'Hyperparameter search', 'Cross-validation', 'Bias–variance tradeoff',
      'Overfitting and regularisation', 'Regression metrics', 'Classification metrics',
      'Threshold selection', 'Calibration', 'Class imbalance', 'Data leakage',
      'Feature importance and explanation', 'Error analysis', 'Model documentation'
    ],
    practical: 'Build and evaluate a stockout-risk model against a decision-relevant baseline.'
  },
  {
    phase: 14,
    title: 'Forecasting, optimisation and advanced science',
    role: 'Forecasting and Decision Scientist',
    topics: [
      'Time-series components', 'Trend and seasonality', 'Autocorrelation', 'Stationarity',
      'Lag and rolling features', 'Exponential smoothing', 'ARIMA concepts',
      'Forecast horizons', 'Backtesting', 'Forecast error metrics', 'Prediction intervals',
      'Intermittent demand', 'Hierarchical forecasting', 'External regressors',
      'Causal impact', 'Uplift modelling', 'Survival and time-to-event analysis',
      'Linear programming', 'Integer optimisation', 'Constraints and trade-offs',
      'Simulation optimisation', 'Decision analysis under uncertainty'
    ],
    practical: 'Forecast product demand by branch and optimise replenishment under constraints.'
  },
  {
    phase: 15,
    title: 'Deep learning, AI and production ML',
    role: 'ML Engineer and AI Engineer',
    topics: [
      'Neural networks and perceptrons', 'Activation functions', 'Backpropagation',
      'Optimisers and learning rates', 'Regularisation and normalisation',
      'Convolutional networks', 'Sequence models', 'Attention and transformers',
      'Embeddings and representation learning', 'Language models and tokenisation',
      'Prompting and structured outputs', 'Information retrieval and vector search',
      'Retrieval-augmented generation', 'Tool use and agents', 'Multimodal systems',
      'Human and automated evaluation', 'Training pipelines', 'Feature stores',
      'Experiment tracking', 'Model registries', 'Batch and online inference',
      'Containers and deployment', 'APIs and serving', 'Latency and throughput',
      'Monitoring and drift', 'Shadow and canary releases', 'Rollback and incident response',
      'Privacy and security', 'Fairness and harmful bias', 'Robustness and adversarial risk',
      'Explainability', 'Model cards and system cards', 'AI governance',
      'Responsible AI and human oversight', 'Technical leadership and strategy'
    ],
    practical: 'Deploy and govern a monitored retail decision system with rollback and human oversight.'
  },
  {
    phase: 16,
    title: 'Lead Data Scientist and data leadership',
    role: 'Lead Data Scientist',
    topics: [
      'Leading problem framing', 'Choosing the right analytical approach',
      'Research and experimentation strategy', 'Causal inference strategy',
      'Forecasting and optimisation strategy', 'Model portfolio management',
      'Technical architecture review', 'Data and feature strategy', 'Evaluation strategy',
      'Responsible AI decision-making', 'Model risk acceptance', 'Privacy-by-design review',
      'Reproducibility and scientific standards', 'Technical writing and design documents',
      'Executive communication', 'Explaining uncertainty to decision-makers',
      'Stakeholder negotiation', 'Prioritisation and opportunity cost',
      'Mentoring analysts and scientists', 'Code, analysis and model review',
      'Hiring and competency frameworks', 'Cross-functional team design',
      'Incident leadership', 'Postmortems and organisational learning',
      'Build-versus-buy decisions', 'Cost, value and return on investment',
      'Long-term data and AI strategy', 'Governance forums and accountability',
      'Leading a capstone from question to monitored production outcome'
    ],
    practical: 'Lead a cross-functional Superstore programme from ambiguous executive question through evidence, deployment, governance and measured business outcome.'
  }
];

export const superstoreTopicCount = superstoreTopics.reduce((total, phase) => total + phase.topics.length, 0);
