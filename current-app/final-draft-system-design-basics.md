# Final Draft: From Bits to System Design

## BB 1276 - From Gates to Circuits

**Subject:** computing | **Topic:** System Design Basics | **Concept:** composition

**Floor 0:** A single logic gate can only answer a very small question.

**Floor 1:** An AND gate asks, "Are both inputs yes?" An OR gate asks, "Is at least one input yes?"

**Floor 2:** By itself, that does not seem like much. But computers become powerful by connecting many simple parts together.

**Floor 3:** A group of gates can compare two values, add numbers, check whether something is true, or decide which instruction should happen next.

**Floor 4:** This is the first big idea in system design: complex systems are usually built from simple parts arranged carefully.

---

## BB 1277 - Inputs, Processing, and Outputs

**Subject:** computing | **Topic:** System Design Basics | **Concept:** input-process-output

**Floor 0:** Almost every computer system follows a basic pattern: input, processing, output.

**Floor 1:** The input is what the system receives. It might be a button press, a message, a search query, a payment, or a sensor reading.

**Floor 2:** Processing is what the system does with that input. It checks rules, transforms data, makes decisions, or asks another part of the system for help.

**Floor 3:** The output is what the system sends back. It might show a result, save a record, send a notification, or trigger another action.

**Floor 4:** System design begins by asking three simple questions: What comes in? What happens to it? What must come out?

---

## BB 1278 - Components

**Subject:** computing | **Topic:** System Design Basics | **Concept:** components

**Floor 0:** A system is easier to understand when we break it into parts called components.

**Floor 1:** A component is a piece of the system with a specific job.

**Floor 2:** In a messaging app, one component might handle login, another might store messages, another might deliver notifications, and another might show the chat screen.

**Floor 3:** Each component hides some complexity from the rest of the system. The notification component does not need to know how passwords work. The login component does not need to know how message bubbles are drawn on screen.

**Floor 4:** Good system design gives each part a clear responsibility, so the whole system is easier to build, change, and repair.

---

## BB 1279 - Interfaces

**Subject:** computing | **Topic:** System Design Basics | **Concept:** interfaces

**Floor 0:** Components need a way to talk to each other.

**Floor 1:** The agreed way one component communicates with another is called an interface.

**Floor 2:** An interface says, "If you give me this kind of input, I will give you this kind of output."

**Floor 3:** For example, a weather app might ask a weather service for the forecast in London. The app sends a location. The service sends back temperature, wind, rain, and time.

**Floor 4:** The app does not need to know how the weather service gathers its data. It only needs the interface to be stable and clear.

**Floor 5:** Interfaces let large systems grow because each part can rely on the promises made by the other parts.

---

## BB 1280 - State

**Subject:** computing | **Topic:** System Design Basics | **Concept:** state

**Floor 0:** Some information disappears after it is used. Other information has to be remembered.

**Floor 1:** The information a system remembers at a particular moment is called its state.

**Floor 2:** If you are logged into an app, your login status is part of the system's state. If items are sitting in your shopping cart, the cart is state. If a message has been read or unread, that is state too.

**Floor 3:** State matters because the same input can mean different things depending on what the system remembers.

**Floor 4:** Pressing "Buy" means one thing if your cart is full, another thing if your cart is empty, and another thing if your payment has already gone through.

**Floor 5:** A system designer has to decide what should be remembered, where it should be stored, and when it should change.

---

## BB 1281 - Databases

**Subject:** computing | **Topic:** System Design Basics | **Concept:** persistence

**Floor 0:** Memory inside a running computer is temporary. If the program stops, that memory can disappear.

**Floor 1:** Many systems need information to survive after the program closes, the phone restarts, or the server crashes.

**Floor 2:** A database is where a system stores information it needs to keep.

**Floor 3:** A banking app stores balances and transactions. A social app stores profiles, posts, and comments. A school system stores students, courses, and grades.

**Floor 4:** The database becomes the system's long-term memory.

**Floor 5:** System design asks what data must be stored, how it should be organized, who is allowed to change it, and how quickly it must be found again.

---

## BB 1282 - Requests and Responses

**Subject:** computing | **Topic:** System Design Basics | **Concept:** client-server

**Floor 0:** Many modern systems are split between a client and a server.

**Floor 1:** The client is the part close to the user. It might be a phone app, a web browser, or a desktop program.

**Floor 2:** The server is the part that runs somewhere else. It receives requests, performs work, talks to databases, and sends back responses.

**Floor 3:** When you open a shopping app and search for headphones, your phone sends a request to a server.

**Floor 4:** The server looks up matching products, applies rules, and sends back a response that your phone can display.

**Floor 5:** This request-response pattern is one of the basic shapes of system design.

---

## BB 1283 - Latency

**Subject:** computing | **Topic:** System Design Basics | **Concept:** latency

**Floor 0:** A system can be correct and still feel bad to use if it is too slow.

**Floor 1:** Latency is the delay between asking for something and getting the answer back.

**Floor 2:** If you tap a button and the screen changes instantly, latency feels low. If you wait several seconds, latency feels high.

**Floor 3:** Latency can come from many places: slow code, a busy database, a weak network connection, or a server that is too far away.

**Floor 4:** System designers pay attention to latency because users experience delay directly.

**Floor 5:** A good system does not only ask, "Does it work?" It also asks, "Does it respond quickly enough?"

---

## BB 1284 - Capacity

**Subject:** computing | **Topic:** System Design Basics | **Concept:** scale

**Floor 0:** A system that works for ten people may fail when ten million people use it.

**Floor 1:** Capacity means how much work a system can handle.

**Floor 2:** A small cafe can serve a few customers at once. If a crowd arrives, the same kitchen, staff, and tables may no longer be enough.

**Floor 3:** Software systems have the same problem. More users mean more requests, more data, more storage, and more pressure on every component.

**Floor 4:** Scaling a system means changing it so it can handle more work without breaking or becoming painfully slow.

**Floor 5:** System design asks where the pressure will appear first and what can be changed before that part fails.

---

## BB 1285 - Bottlenecks

**Subject:** computing | **Topic:** System Design Basics | **Concept:** bottlenecks

**Floor 0:** In any system, the slowest or most overloaded part can limit everything else.

**Floor 1:** That limiting part is called a bottleneck.

**Floor 2:** Imagine a wide road that suddenly narrows to one lane. It does not matter how wide the road is before that point. Traffic still slows where the road becomes narrow.

**Floor 3:** In software, the bottleneck might be a database, a network connection, a file upload service, or a single server doing too much work.

**Floor 4:** Finding bottlenecks is one of the most practical parts of system design.

**Floor 5:** Once you know which part is limiting the system, you can decide whether to speed it up, split the work, cache results, or redesign the flow.

---

## BB 1286 - Caching

**Subject:** computing | **Topic:** System Design Basics | **Concept:** caching

**Floor 0:** Some answers are expensive to produce again and again.

**Floor 1:** A cache stores a recently used or commonly needed answer in a faster place.

**Floor 2:** If many people ask for the same weather forecast, the system does not always need to calculate or fetch it from the original source every time.

**Floor 3:** It can keep a copy for a short period and reuse it.

**Floor 4:** Caching can make a system much faster, but it introduces a new question: how old is the saved answer allowed to be?

**Floor 5:** Good system design balances speed with freshness.

---

## BB 1287 - Reliability

**Subject:** computing | **Topic:** System Design Basics | **Concept:** reliability

**Floor 0:** Real systems fail.

**Floor 1:** Servers crash. Networks drop. Databases get busy. A service that worked a moment ago may stop responding.

**Floor 2:** Reliability is the ability of a system to keep working, or recover well, when something goes wrong.

**Floor 3:** A reliable system does not assume every part will be perfect all the time.

**Floor 4:** It might retry a failed request, keep backup copies of data, route traffic to another server, or show a useful message instead of silently breaking.

**Floor 5:** System design is partly the art of asking, "What happens when this part fails?"

---

## BB 1288 - Trade-Offs

**Subject:** computing | **Topic:** System Design Basics | **Concept:** trade-offs

**Floor 0:** There is rarely one perfect design.

**Floor 1:** A system that is very fast may use more memory. A system that stores every detail may become harder to search. A system that is very secure may require extra steps from the user.

**Floor 2:** These choices are called trade-offs.

**Floor 3:** System design is not only about knowing the parts. It is about choosing which qualities matter most for the problem in front of you.

**Floor 4:** A banking system cares deeply about correctness and security. A video streaming system cares deeply about speed and smooth playback. A classroom quiz app may care most about simplicity and ease of use.

**Floor 5:** Good designers explain their trade-offs clearly, because every design is a set of decisions.
