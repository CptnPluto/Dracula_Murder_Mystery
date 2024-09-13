import express from "express";
import OpenAi from "openai";
import path from "path";

const app = express();
const client = new OpenAi();

// Middleware to serve static files and parse JSON
app.use(express.static("public"));
app.use(express.json());

// Serve the index.html file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

// Chat endpoint
app.post("/chat", async (req, res) => {
	try {
		const userMessage = req.body.message;

		// Start streaming response to client
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		// Create a streaming OpenAI API request
		const completion = await client.chat.completions.create({
			model: "gpt-4",
			messages: [
				{ role: "system", content: process.env.PROMPT },
				{ role: "user", content: process.env.PROMPT + userMessage },
			],
            max_tokens: 500,
			stream: true, // Enable streaming
		});

		// Stream the data chunk by chunk using async iterator
		for await (const chunk of completion) {
			const content = chunk.choices[0].delta?.content;
			if (content) {
				res.write(`${content}`); // Send each chunk to the client
			}
		}

		// Indicate the end of the stream
		// res.write("data: [DONE]\n\n");
		res.end();
	} catch (error) {
		console.error("Error creating chat completion:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
