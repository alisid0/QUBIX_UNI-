# Wikipedia Concept Atlas for Data Science, Machine Learning and AI

Status: **Reference map only; no listed concept is an approved board**  
Recorded: 2026-08-21  
Current drafting gate: `STAT-DATA-001` only

## Purpose

This atlas makes Qubix broad without making it shallow. Wikipedia's outline and
topic pages provide a navigable map of neighbouring concepts, terminology,
history and references. They do not replace textbooks, standards, datasets,
papers or official documentation as the authority for a board.

Every future board must still pass its own prerequisite, source, interaction,
assessment and founder-review gates. A link below is a research lead, not copied
lesson text and not permission to bulk-generate learner content.

## Source hierarchy

1. **Primary authority:** textbooks, original papers, standards and official
   documentation appropriate to the claim.
2. **Reference atlas:** Wikipedia pages used to discover vocabulary, connected
   ideas, historical context and cited primary sources.
3. **Qubix transformation:** original explanations, examples, datasets,
   deterministic diagrams, simulations, missions and assessments.
4. **Verification:** calculations and code are independently checked; unstable
   technical claims are checked against current official documentation.

## Foundation I — data and measurement

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| What data describes | [Data](https://en.wikipedia.org/wiki/Data), [Data set](https://en.wikipedia.org/wiki/Data_set), [Unit of observation](https://en.wikipedia.org/wiki/Unit_of_observation), [Statistical population](https://en.wikipedia.org/wiki/Statistical_population) | case, record, variable, value, population |
| How data is obtained | [Data collection](https://en.wikipedia.org/wiki/Data_collection), [Sampling](https://en.wikipedia.org/wiki/Sampling_(statistics)), [Census](https://en.wikipedia.org/wiki/Census), [Observational study](https://en.wikipedia.org/wiki/Observational_study), [Experiment](https://en.wikipedia.org/wiki/Experiment) | source, sample, census, observation, intervention |
| Kinds of values | [Statistical data type](https://en.wikipedia.org/wiki/Statistical_data_type), [Level of measurement](https://en.wikipedia.org/wiki/Level_of_measurement), [Categorical variable](https://en.wikipedia.org/wiki/Categorical_variable), [Continuous or discrete variable](https://en.wikipedia.org/wiki/Continuous_or_discrete_variable) | categorical/quantitative, nominal/ordinal, discrete/continuous |
| Trustworthiness | [Missing data](https://en.wikipedia.org/wiki/Missing_data), [Data quality](https://en.wikipedia.org/wiki/Data_quality), [Measurement error](https://en.wikipedia.org/wiki/Measurement_error), [Data lineage](https://en.wikipedia.org/wiki/Data_lineage), [Metadata](https://en.wikipedia.org/wiki/Metadata) | missing is not zero, units, validity, provenance, audit trail |
| Responsible data | [Data ethics](https://en.wikipedia.org/wiki/Data_ethics), [Privacy](https://en.wikipedia.org/wiki/Privacy), [Anonymization](https://en.wikipedia.org/wiki/Data_anonymization), [Open data](https://en.wikipedia.org/wiki/Open_data), [Data governance](https://en.wikipedia.org/wiki/Data_governance) | consent, minimisation, licensing, privacy, stewardship |

## Foundation II — describing distributions

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Counts and shape | [Frequency distribution](https://en.wikipedia.org/wiki/Frequency_distribution), [Histogram](https://en.wikipedia.org/wiki/Histogram), [Bar chart](https://en.wikipedia.org/wiki/Bar_chart), [Empirical distribution function](https://en.wikipedia.org/wiki/Empirical_distribution_function) | frequency, relative frequency, bins, shape |
| Centre | [Central tendency](https://en.wikipedia.org/wiki/Central_tendency), [Arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean), [Median](https://en.wikipedia.org/wiki/Median), [Mode](https://en.wikipedia.org/wiki/Mode_(statistics)) | different centres answer different questions |
| Spread | [Statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion), [Range](https://en.wikipedia.org/wiki/Range_(statistics)), [Interquartile range](https://en.wikipedia.org/wiki/Interquartile_range), [Variance](https://en.wikipedia.org/wiki/Variance), [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) | spread is not centre; units and squared units |
| Position | [Quantile](https://en.wikipedia.org/wiki/Quantile), [Percentile](https://en.wikipedia.org/wiki/Percentile), [Standard score](https://en.wikipedia.org/wiki/Standard_score), [Outlier](https://en.wikipedia.org/wiki/Outlier) | rank, relative position, context before removal |
| Shape and relationships | [Skewness](https://en.wikipedia.org/wiki/Skewness), [Kurtosis](https://en.wikipedia.org/wiki/Kurtosis), [Scatter plot](https://en.wikipedia.org/wiki/Scatter_plot), [Correlation](https://en.wikipedia.org/wiki/Correlation), [Covariance](https://en.wikipedia.org/wiki/Covariance) | symmetry, tails, direction, strength, non-causality |
| Exploratory practice | [Exploratory data analysis](https://en.wikipedia.org/wiki/Exploratory_data_analysis), [Data visualization](https://en.wikipedia.org/wiki/Data_and_information_visualization), [Box plot](https://en.wikipedia.org/wiki/Box_plot), [Anscombe's quartet](https://en.wikipedia.org/wiki/Anscombe%27s_quartet) | graph before summary; summaries can conceal structure |

## Foundation III — probability and uncertainty

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Events | [Random experiment](https://en.wikipedia.org/wiki/Random_experiment), [Sample space](https://en.wikipedia.org/wiki/Sample_space), [Event](https://en.wikipedia.org/wiki/Event_(probability_theory)), [Probability](https://en.wikipedia.org/wiki/Probability), [Probability axioms](https://en.wikipedia.org/wiki/Probability_axioms) | outcome, event, complement, union, probability rules |
| Counting | [Rule of product](https://en.wikipedia.org/wiki/Rule_of_product), [Permutation](https://en.wikipedia.org/wiki/Permutation), [Combination](https://en.wikipedia.org/wiki/Combination), [Binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) | systematic counting without double-counting |
| Dependence | [Conditional probability](https://en.wikipedia.org/wiki/Conditional_probability), [Independence](https://en.wikipedia.org/wiki/Independence_(probability_theory)), [Law of total probability](https://en.wikipedia.org/wiki/Law_of_total_probability), [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem) | update a probability when information changes |
| Random quantities | [Random variable](https://en.wikipedia.org/wiki/Random_variable), [Probability distribution](https://en.wikipedia.org/wiki/Probability_distribution), [Probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function), [Probability density function](https://en.wikipedia.org/wiki/Probability_density_function), [Cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) | outcomes mapped to values; mass versus density |
| Long-run summaries | [Expected value](https://en.wikipedia.org/wiki/Expected_value), [Variance](https://en.wikipedia.org/wiki/Variance), [Law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers), [Central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) | expectation is a weighted balance; repetition stabilises patterns |
| Discrete families | [Bernoulli](https://en.wikipedia.org/wiki/Bernoulli_distribution), [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution), [Geometric](https://en.wikipedia.org/wiki/Geometric_distribution), [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) | match assumptions to a chance mechanism |
| Continuous families | [Uniform](https://en.wikipedia.org/wiki/Continuous_uniform_distribution), [Normal](https://en.wikipedia.org/wiki/Normal_distribution), [Exponential](https://en.wikipedia.org/wiki/Exponential_distribution) | areas represent probabilities; parameters change shape |
| Simulation | [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method), [Pseudorandom generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) | simulate a mechanism, set a seed, quantify simulation error |

## Foundation IV — inference and evidence

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Sample to population | [Statistical inference](https://en.wikipedia.org/wiki/Statistical_inference), [Sampling distribution](https://en.wikipedia.org/wiki/Sampling_distribution), [Statistic](https://en.wikipedia.org/wiki/Statistic), [Parameter](https://en.wikipedia.org/wiki/Statistical_parameter) | distinguish data, statistic, estimator and parameter |
| Estimation | [Estimator](https://en.wikipedia.org/wiki/Estimator), [Estimator bias](https://en.wikipedia.org/wiki/Bias_of_an_estimator), [Standard error](https://en.wikipedia.org/wiki/Standard_error), [Confidence interval](https://en.wikipedia.org/wiki/Confidence_interval), [Bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(statistics)) | estimate plus uncertainty, not a naked number |
| Testing | [Hypothesis test](https://en.wikipedia.org/wiki/Statistical_hypothesis_test), [Null hypothesis](https://en.wikipedia.org/wiki/Null_hypothesis), [P-value](https://en.wikipedia.org/wiki/P-value), [Type I and II errors](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors) | test logic, long-run error rates, no proof from one p-value |
| Importance | [Effect size](https://en.wikipedia.org/wiki/Effect_size), [Statistical power](https://en.wikipedia.org/wiki/Statistical_power), [Practical significance](https://en.wikipedia.org/wiki/Practical_significance), [Multiple comparisons](https://en.wikipedia.org/wiki/Multiple_comparisons_problem) | magnitude, precision and decision context |
| Likelihood | [Likelihood function](https://en.wikipedia.org/wiki/Likelihood_function), [Maximum likelihood](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation), [Log-likelihood](https://en.wikipedia.org/wiki/Likelihood_function#Log-likelihood) | compare parameter values by support from observed data |
| Bayesian inference | [Bayesian inference](https://en.wikipedia.org/wiki/Bayesian_inference), [Prior probability](https://en.wikipedia.org/wiki/Prior_probability), [Posterior probability](https://en.wikipedia.org/wiki/Posterior_probability), [Credible interval](https://en.wikipedia.org/wiki/Credible_interval) | combine prior model and evidence transparently |

## Foundation V — study design and causality

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Sampling quality | [Simple random sample](https://en.wikipedia.org/wiki/Simple_random_sample), [Stratified sampling](https://en.wikipedia.org/wiki/Stratified_sampling), [Cluster sampling](https://en.wikipedia.org/wiki/Cluster_sampling), [Sampling bias](https://en.wikipedia.org/wiki/Sampling_bias), [Nonresponse bias](https://en.wikipedia.org/wiki/Participation_bias) | representation comes from design, not sample size alone |
| Experiments | [Design of experiments](https://en.wikipedia.org/wiki/Design_of_experiments), [Random assignment](https://en.wikipedia.org/wiki/Random_assignment), [Control group](https://en.wikipedia.org/wiki/Control_group), [Blinding](https://en.wikipedia.org/wiki/Blinded_experiment), [Randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial) | comparison, randomisation, replication and masking |
| Threats | [Confounding](https://en.wikipedia.org/wiki/Confounding), [Selection bias](https://en.wikipedia.org/wiki/Selection_bias), [Survivorship bias](https://en.wikipedia.org/wiki/Survivorship_bias), [Simpson's paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox) | observed association can reverse or disappear |
| Causal reasoning | [Causality](https://en.wikipedia.org/wiki/Causality), [Correlation is not causation](https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation), [Potential outcomes](https://en.wikipedia.org/wiki/Rubin_causal_model), [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) | intervention question, counterfactual, causal assumptions |
| Product experiments | [A/B testing](https://en.wikipedia.org/wiki/A/B_testing), [Sequential analysis](https://en.wikipedia.org/wiki/Sequential_analysis), [Stopping rule](https://en.wikipedia.org/wiki/Stopping_rule) | pre-register metrics, guardrails and stopping logic |

## Foundation VI — practical data work

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Files and tables | [CSV](https://en.wikipedia.org/wiki/Comma-separated_values), [JSON](https://en.wikipedia.org/wiki/JSON), [Relational database](https://en.wikipedia.org/wiki/Relational_database), [SQL](https://en.wikipedia.org/wiki/SQL), [Database normalization](https://en.wikipedia.org/wiki/Database_normalization) | schema, key, relation, join, tidy structure |
| Cleaning | [Data cleansing](https://en.wikipedia.org/wiki/Data_cleansing), [Data wrangling](https://en.wikipedia.org/wiki/Data_wrangling), [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load), [Imputation](https://en.wikipedia.org/wiki/Imputation_(statistics)) | inspect, transform, validate, retain lineage |
| Programming | [Python](https://en.wikipedia.org/wiki/Python_(programming_language)), [NumPy](https://en.wikipedia.org/wiki/NumPy), [pandas](https://en.wikipedia.org/wiki/Pandas_(software)), [Jupyter](https://en.wikipedia.org/wiki/Project_Jupyter) | arrays, tables, vectorised operations, notebooks |
| Communication | [Statistical graphics](https://en.wikipedia.org/wiki/Statistical_graphics), [Scientific visualization](https://en.wikipedia.org/wiki/Scientific_visualization), [Data storytelling](https://en.wikipedia.org/wiki/Data_and_information_visualization) | choose encodings that answer a question honestly |
| Reproducibility | [Version control](https://en.wikipedia.org/wiki/Version_control), [Software testing](https://en.wikipedia.org/wiki/Software_testing), [Reproducible builds](https://en.wikipedia.org/wiki/Reproducible_builds), [Data version control](https://en.wikipedia.org/wiki/Data_version_control) | code, data, environment and results can be reconstructed |

## Foundation VII — mathematics for machine learning

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Linear algebra | [Vector](https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics)), [Matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics)), [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication), [Linear map](https://en.wikipedia.org/wiki/Linear_map), [Basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra)) | data as vectors; transformations as matrices |
| Geometry | [Dot product](https://en.wikipedia.org/wiki/Dot_product), [Norm](https://en.wikipedia.org/wiki/Norm_(mathematics)), [Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity), [Eigenvectors](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) | length, angle, projection, important directions |
| Calculus | [Derivative](https://en.wikipedia.org/wiki/Derivative), [Partial derivative](https://en.wikipedia.org/wiki/Partial_derivative), [Gradient](https://en.wikipedia.org/wiki/Gradient), [Chain rule](https://en.wikipedia.org/wiki/Chain_rule) | local change and multivariable sensitivity |
| Optimisation | [Mathematical optimization](https://en.wikipedia.org/wiki/Mathematical_optimization), [Gradient descent](https://en.wikipedia.org/wiki/Gradient_descent), [Convex optimization](https://en.wikipedia.org/wiki/Convex_optimization), [Loss function](https://en.wikipedia.org/wiki/Loss_function), [Regularization](https://en.wikipedia.org/wiki/Regularization_(mathematics)) | choose parameters by an explicit objective and constraints |

## Foundation VIII — machine learning

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Problem framing | [Machine learning](https://en.wikipedia.org/wiki/Machine_learning), [Supervised learning](https://en.wikipedia.org/wiki/Supervised_learning), [Unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning), [Reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning) | task, input, target, feedback and evaluation unit |
| Generalisation | [Train/validation/test](https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets), [Cross-validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)), [Overfitting](https://en.wikipedia.org/wiki/Overfitting), [Underfitting](https://en.wikipedia.org/wiki/Overfitting#Underfitting), [Bias–variance](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff) | performance on unseen data is the point |
| Core models | [Linear regression](https://en.wikipedia.org/wiki/Linear_regression), [Logistic regression](https://en.wikipedia.org/wiki/Logistic_regression), [Classification](https://en.wikipedia.org/wiki/Statistical_classification), [k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm), [Support vector machine](https://en.wikipedia.org/wiki/Support_vector_machine) | assumptions, boundaries, scores and decisions |
| Trees and ensembles | [Decision tree](https://en.wikipedia.org/wiki/Decision_tree_learning), [Random forest](https://en.wikipedia.org/wiki/Random_forest), [Gradient boosting](https://en.wikipedia.org/wiki/Gradient_boosting), [Ensemble learning](https://en.wikipedia.org/wiki/Ensemble_learning) | partition, average, boost and control complexity |
| Unsupervised structure | [Cluster analysis](https://en.wikipedia.org/wiki/Cluster_analysis), [k-means](https://en.wikipedia.org/wiki/K-means_clustering), [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis), [Dimensionality reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction) | discover structure without mistaking it for truth |
| Features | [Feature engineering](https://en.wikipedia.org/wiki/Feature_engineering), [Feature selection](https://en.wikipedia.org/wiki/Feature_selection), [One-hot encoding](https://en.wikipedia.org/wiki/One-hot) | representation changes what a model can learn |
| Evaluation | [Confusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix), [Precision and recall](https://en.wikipedia.org/wiki/Precision_and_recall), [ROC curve](https://en.wikipedia.org/wiki/Receiver_operating_characteristic), [Calibration](https://en.wikipedia.org/wiki/Calibration_(statistics)), [Scoring rule](https://en.wikipedia.org/wiki/Scoring_rule) | metrics encode costs and must match the decision |
| Failure modes | [Data leakage](https://en.wikipedia.org/wiki/Leakage_(machine_learning)), [Dataset shift](https://en.wikipedia.org/wiki/Dataset_shift), [Concept drift](https://en.wikipedia.org/wiki/Concept_drift), [Algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias) | protect evaluation and monitor changing conditions |

## Foundation IX — deep learning and modern AI

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Neural foundations | [Neural network](https://en.wikipedia.org/wiki/Artificial_neural_network), [Perceptron](https://en.wikipedia.org/wiki/Perceptron), [Activation](https://en.wikipedia.org/wiki/Activation_function), [Backpropagation](https://en.wikipedia.org/wiki/Backpropagation) | weighted computation graph, activation, gradient and update |
| Architectures | [CNN](https://en.wikipedia.org/wiki/Convolutional_neural_network), [RNN](https://en.wikipedia.org/wiki/Recurrent_neural_network), [Autoencoder](https://en.wikipedia.org/wiki/Autoencoder), [Transformer](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)) | inductive bias for space, sequence and representation |
| Representation | [Embedding](https://en.wikipedia.org/wiki/Embedding_(machine_learning)), [Representation learning](https://en.wikipedia.org/wiki/Feature_learning), [Attention](https://en.wikipedia.org/wiki/Attention_(machine_learning)) | useful geometry learned from data |
| Language models | [Language model](https://en.wikipedia.org/wiki/Language_model), [Large language model](https://en.wikipedia.org/wiki/Large_language_model), [Tokenization](https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization), [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) | next-token modelling, context, prompting and limitations |
| Grounding | [Information retrieval](https://en.wikipedia.org/wiki/Information_retrieval), [Vector database](https://en.wikipedia.org/wiki/Vector_database), [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation), [Knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph) | retrieve evidence, generate, cite and evaluate |
| Agents | [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent), [Automated planning](https://en.wikipedia.org/wiki/Automated_planning_and_scheduling), [Tool use](https://en.wikipedia.org/wiki/Tool_use), [Multi-agent system](https://en.wikipedia.org/wiki/Multi-agent_system) | observe, decide, act, verify and recover |
| Generative models | [Generative model](https://en.wikipedia.org/wiki/Generative_model), [GAN](https://en.wikipedia.org/wiki/Generative_adversarial_network), [Diffusion model](https://en.wikipedia.org/wiki/Diffusion_model) | learn a data-generating process; sample with controls |

## Foundation X — production, evaluation and responsibility

| Cluster | Reference pages | Board-level understandings to earn |
|---|---|---|
| Production | [MLOps](https://en.wikipedia.org/wiki/MLOps), [Deployment](https://en.wikipedia.org/wiki/Deployment_environment), [Observability](https://en.wikipedia.org/wiki/Observability_(software)), [A/B testing](https://en.wikipedia.org/wiki/A/B_testing) | version, deploy, monitor, compare and roll back |
| Reliability | [Robust statistics](https://en.wikipedia.org/wiki/Robust_statistics), [Adversarial ML](https://en.wikipedia.org/wiki/Adversarial_machine_learning), [Distribution shift](https://en.wikipedia.org/wiki/Dataset_shift), [Uncertainty quantification](https://en.wikipedia.org/wiki/Uncertainty_quantification) | stress-test beyond average benchmark performance |
| Explanation | [Explainable AI](https://en.wikipedia.org/wiki/Explainable_artificial_intelligence), [Interpretability](https://en.wikipedia.org/wiki/Interpretability), [Model card](https://en.wikipedia.org/wiki/Model_card) | document intended use, evidence, limits and impacts |
| Fairness and rights | [ML fairness](https://en.wikipedia.org/wiki/Fairness_(machine_learning)), [Algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias), [Information privacy](https://en.wikipedia.org/wiki/Information_privacy), [AI and copyright](https://en.wikipedia.org/wiki/Artificial_intelligence_and_copyright) | measure harms, respect rights, record decisions |
| Safety and governance | [AI safety](https://en.wikipedia.org/wiki/AI_safety), [AI alignment](https://en.wikipedia.org/wiki/AI_alignment), [AI regulation](https://en.wikipedia.org/wiki/Regulation_of_artificial_intelligence), [Risk management](https://en.wikipedia.org/wiki/Risk_management) | threat model, evaluate, constrain, govern and audit |

## Transformation rule for every future board

For each candidate concept, the authoring record must capture:

- the exact Wikipedia revision inspected and its role;
- the stronger primary source selected for the learning claim;
- what was quoted, paraphrased, independently derived or newly created;
- the licence and attribution for every reused text or media asset;
- a single observable learner understanding;
- prerequisites and misconception boundaries;
- two operable interaction variants and two assessment variants;
- an original Qubix example or appropriately licensed real dataset;
- independent calculation, code, accessibility and responsive checks.

The next permitted content decision remains founder selection on
`STAT-DATA-001`. The atlas deliberately creates breadth in planning while the
Factory gate protects depth in production.

