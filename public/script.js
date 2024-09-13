const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const responseElement = document.getElementById("response");
const cursorArea = document.getElementById("cursorArea");

let timeout;

// Function to reset the UI
function resetUI() {
	userInput.value = "";
	responseElement.style.display = "none";
	sendButton.style.display = "none";
	cursorArea.style.display = "block";
}

// Handle when the user starts typing
userInput.addEventListener("input", () => {
	sendButton.style.display = userInput.value.trim() ? "block" : "none";
});

// Show input and hide cursor when clicking the text area
cursorArea.addEventListener("click", () => {
	cursorArea.style.display = "none";
	userInput.style.visibility = "visible";
	userInput.style.height = "100px";
	userInput.focus();
});

// Function to stream the response using fetch with POST
async function streamChatResponse(message) {
	const response = await fetch("/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message }),
	});

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	responseElement.innerHTML = ""; // Clear previous response
	responseElement.style.display = "inline"; // Show the response

	// Process the stream
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		const chunk = decoder.decode(value, { stream: true });
		responseElement.innerHTML += `${chunk}`;
	}

	// After 20 seconds, reset the UI
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		resetUI();
	}, 20000);
}

// Handle sending the message
sendButton.addEventListener("click", () => {
	const sanitizedInput = userInput.value.trim();
	if (sanitizedInput) {
		streamChatResponse(sanitizedInput); // Call the streaming function
	}
});
