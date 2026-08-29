# AI Behind The Curtain Curriculum

This is the topic-first map for a new Computer Science branch: a plain-language path that explains what AI is, what LLMs are, why the machine still only moves bits, and which maths and systems sit underneath the experience of "talking to a computer."

The goal is not to make the learner a machine-learning engineer in one path. The goal is to remove the fog. A learner should finish this branch able to explain, in ordinary language, how text becomes tokens, how tokens become numbers, how models learn from examples, why probability is involved, why GPUs and networks matter, why agents are risky, and why LLMs are only one part of AI.

Suggested launch size: 72 BBs across 9 topics.

Suggested premium spine later: 120 to 140 BBs with workshops, projects, and deeper maths branches.

---

## Core Promise

After this path, a learner should understand:

- A computer does not read English directly. English is turned into numbers, and numbers are moved through circuits.
- AI is not one technology. It includes rules, search, prediction, pattern recognition, language models, vision systems, recommender systems, robotics, and agents.
- LLMs predict tokens using learned patterns. They do not "know" in the same way a person knows.
- The maths behind AI is mostly vectors, matrices, functions, probability, calculus, optimisation, and statistics.
- Modern AI is also system design: data pipelines, APIs, GPUs, servers, memory, networks, evaluation, safety, logging, and cost.
- AI agents are loops that combine models with tools, memory, permissions, and feedback.

---

## Topic 1: From Bits To Meaning

Purpose: connect directly from The Bit. This prevents AI from feeling magical.

Proposed BBs: 8

1. The machine still only has 0s and 1s
2. Text becomes numbers before the computer can touch it
3. Encoding gives characters a numeric code
4. A token is a chunk of text the model can process
5. The same sentence becomes a list of token IDs
6. Token IDs become vectors
7. Meaning is handled as position in number space
8. AI begins when representation becomes useful

Key floor idea:
The computer is not reading the word "cat." It is receiving numbers assigned to pieces of text, then moving those numbers through mathematical machinery.

Workshop idea:
Token splitter. The learner types a sentence, watches it split into rough tokens, then sees each token become a fake ID and a small vector.

---

## Topic 2: AI Is Bigger Than LLMs

Purpose: stop the learner from equating all AI with chatbots.

Proposed BBs: 8

1. AI means machines doing tasks that normally require judgment
2. Rule-based AI follows human-written rules
3. Search AI explores possible moves
4. Machine learning finds patterns from examples
5. Computer vision recognises patterns in images
6. Speech AI turns sound into structure
7. Recommender systems predict what people may choose
8. LLMs are one branch, not the whole tree

Key floor idea:
A chess engine, a spam filter, a face detector, a translation system, a TikTok recommendation feed, and a chatbot all count as AI in different ways.

Workshop idea:
Sort the AI. Learner drags examples into rules, search, prediction, vision, speech, recommender, and language.

---

## Topic 3: Learning From Examples

Purpose: explain training without jumping into equations too early.

Proposed BBs: 8

1. A model is a machine with adjustable settings
2. Training means changing those settings using examples
3. A dataset is the teacher the model actually sees
4. Labels tell the model what answer was expected
5. Features are the clues the model receives
6. The model makes a guess, then measures the error
7. Repeated correction slowly changes behaviour
8. Bad data teaches bad habits

Key floor idea:
Training is not a person typing rules into the model. It is a repeated cycle: show example, guess, measure error, adjust.

Workshop idea:
Train a tiny classifier. Learner labels simple dots or cards, then watches a boundary move after each correction.

---

## Topic 4: Probability, Uncertainty, And Prediction

Purpose: make probabilistic thinking normal before LLM sampling appears.

Proposed BBs: 8

1. AI often answers with likelihood, not certainty
2. Probability measures how strongly a system expects an outcome
3. Classification is choosing among possible labels
4. Confidence is not the same as truth
5. A model can be confident and wrong
6. Sampling chooses from likely possibilities
7. Temperature controls how adventurous the choice becomes
8. Hallucination begins when fluent prediction outruns evidence

Key floor idea:
An LLM does not pull one guaranteed sentence from a shelf. It weighs possible next tokens and chooses according to a probability pattern.

Workshop idea:
Next-token casino. Learner adjusts temperature and sees the same prompt produce safe, varied, or chaotic continuations.

---

## Topic 5: The Maths Under The Hood

Purpose: open maths branches without overwhelming the beginner.

Proposed BBs: 10

1. Functions turn inputs into outputs
2. Vectors store many numbers as one object
3. Matrices move many vectors at once
4. A model layer is mostly matrix work
5. Graphs and curves show how error changes
6. Calculus measures how a change affects the result
7. A gradient points toward a better adjustment
8. Optimisation means finding settings that reduce error
9. Statistics checks whether patterns are real or noise
10. Information theory asks how much surprise a signal carries

Key floor idea:
AI maths is not one giant formula. It is a toolkit: functions for mapping, vectors for storing meaning, matrices for moving data, probability for uncertainty, calculus for improvement.

Workshop idea:
Vector space map. Learner moves word points closer or farther and sees similarity scores change.

Math branches opened:

- Functions
- Vectors
- Matrices
- Probability
- Statistics
- Calculus
- Optimisation
- Information theory

---

## Topic 6: Gradient Descent And Training

Purpose: explain the famous training idea clearly enough that later deep learning makes sense.

Proposed BBs: 8

1. The loss function measures how wrong the model is
2. Training tries to make loss smaller
3. A gradient tells which direction changes loss fastest
4. Gradient descent takes small steps downhill
5. The learning rate controls step size
6. Too small learns slowly, too large overshoots
7. Backpropagation sends blame backward through layers
8. Training is expensive because this happens billions of times

Key floor idea:
Gradient descent is not the model thinking deeply. It is a method for adjusting many numbers in the direction that reduces error.

Workshop idea:
Loss mountain. Learner moves a point downhill with different learning rates and sees slow learning, overshooting, and convergence.

---

## Topic 7: Neural Networks, Transformers, And LLMs

Purpose: show what makes modern language models work without pretending the full maths is simple.

Proposed BBs: 10

1. A neural network is layers of number transformations
2. Weights decide how strongly signals matter
3. Activation functions add bend to the model
4. Deep learning means many layers working together
5. Embeddings put tokens into vector space
6. Attention lets tokens look at other tokens
7. Transformers use attention at scale
8. Pretraining teaches broad language patterns
9. Fine-tuning shapes behaviour for a task
10. Inference is the model running forward to produce output

Key floor idea:
A transformer is not a brain in a box. It is a large mathematical system that repeatedly transforms token vectors while letting each token use information from other tokens.

Workshop idea:
Attention spotlight. Learner selects a word in a sentence and sees which other words it should attend to for meaning.

---

## Topic 8: AI System Design

Purpose: connect AI to real products, not just model theory.

Proposed BBs: 10

1. An AI product is more than a model
2. The frontend collects the user request
3. The backend prepares the prompt and context
4. The model API returns generated output
5. Retrieval finds relevant documents first
6. Databases store users, content, memory, and logs
7. Queues handle slow AI jobs
8. GPUs handle heavy matrix work
9. Networks move requests between services
10. Monitoring catches cost, latency, and failure

Key floor idea:
When a user asks an AI app a question, the request may pass through a browser, server, database, vector search system, model server, logging system, and safety check before an answer appears.

Workshop idea:
Build the AI pipeline. Learner connects blocks: user, frontend, backend, database, retrieval, model, safety check, response.

---

## Topic 9: Agents, Tools, Safety, And Work

Purpose: explain where AI is heading as a usable work system.

Proposed BBs: 12

1. An agent is a model inside a loop
2. Tools let the model act outside text
3. A browser tool can gather current information
4. A terminal tool can inspect and change files
5. Memory records useful state
6. Planning splits a goal into steps
7. Permissions decide what the agent is allowed to do
8. Evaluation checks whether the work is good
9. Guardrails reduce damage, but cannot replace judgment
10. AI security includes prompt injection and data leakage
11. Human review matters most near money, health, law, and production systems
12. The new skill is directing machines without surrendering responsibility

Key floor idea:
An agent is not just a smarter chatbot. It is a model that can choose actions, use tools, read results, and keep going. That makes design and permissions serious.

Workshop idea:
Agent permissions lab. Learner gives an agent different tool permissions and predicts what could go wrong.

---

## Later Specialist Branches

These should sprout after the main branch has landed.

### Maths For AI

Suggested BBs: 30 to 45

- Functions as machines
- Vectors and similarity
- Matrix multiplication
- Dot products
- Probability distributions
- Bayes thinking
- Entropy and surprise
- Loss functions
- Gradients
- Partial derivatives
- Optimisation
- Regression and classification
- Evaluation metrics

### AI Engineering

Suggested BBs: 30 to 45

- APIs
- Rate limits
- Caching
- Model routing
- Prompt templates
- Structured outputs
- Function calling
- RAG pipelines
- Vector databases
- Embedding refresh
- Batch jobs
- Queues
- Observability
- Cost control
- Deployment and rollback

### AI Safety And Security

Suggested BBs: 20 to 30

- Prompt injection
- Data leakage
- Sensitive data handling
- Model bias
- Overconfidence
- Source checking
- Jailbreaks
- Tool misuse
- Audit logs
- Human approval points

### AI Beyond Language

Suggested BBs: 25 to 35

- Image classification
- Object detection
- OCR
- Speech recognition
- Text-to-speech
- Recommendation systems
- Forecasting
- Anomaly detection
- Reinforcement learning
- Robotics
- Scientific AI

---

## Recommended First Build Batch

Start with Topic 1 and Topic 2 only. That gives learners a clear foundation before we introduce gradients or transformers.

Batch A: 16 BBs

- Topic 1: From Bits To Meaning, 8 BBs
- Topic 2: AI Is Bigger Than LLMs, 8 BBs

Why this first:

- It connects cleanly to The Bit.
- It makes AI feel physical and computational, not mystical.
- It corrects the common mistake that AI equals ChatGPT-style language models.
- It creates hooks for later workshops on tokens, vectors, classification, and model systems.

Suggested app topic name:

AI Behind the Curtain

Suggested topic order under Computer Science:

1. The Bit
2. AI-era computing
3. AI Behind the Curtain
4. Operating systems
5. Databases and SQL
6. Networks and cloud
7. Cybersecurity practice
8. AI engineering

---

## Tone Rules For These BBs

- Keep the bit-level connection visible.
- Use concrete machines, files, requests, numbers, and errors.
- Avoid mystical wording.
- Avoid saying the model "understands" unless the floor explains the limit of that word.
- Use "we" where useful, but do not over-address the reader.
- Let the learner feel capable, not dazzled.
- One hard idea per BB.
- Four floors per BB is ideal for the first batch.

---

## Launch Standard

For the first 16 BBs:

- Every BB should have 4 floors.
- Every floor should be readable in one phone screen.
- At least 6 BBs should have visual prompts.
- At least 2 BBs should become workshops.
- No advanced equations in Batch A.
- Vocabulary should introduce terms slowly: token, encoding, vector, model, rule-based AI, machine learning, classification.

For the full 72-BB branch:

- Topics 1 to 4 should be beginner-friendly.
- Topic 5 opens maths branches.
- Topic 6 can introduce formulas lightly.
- Topic 7 explains LLMs properly.
- Topic 8 turns the idea into product architecture.
- Topic 9 turns the idea into real work, risk, and responsibility.
