let prompt = document.querySelector("#prompt");
let container = document.querySelector("#container");  // Correct selector for the container
let ChatContainer = document.querySelector(".chat-container");
let btn = document.querySelector("#btn");
let userMessage = null;

const Api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCz8Pn6LrAPytS1QJuaDv_jdENcK5w89ok';

function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text");
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: `${userMessage} in 10 words` }]
                }]
            })
        });
        const data = await response.json();
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse;

    } catch (error) {
        console.log(error);
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}

function showLoading() {
    const html = `<div id="img">
                    <img src="ai.png" alt="">
                </div>
                <div class="text"></div>
                <img src="loading.gif" alt="" height="50" class="loading">`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    ChatContainer.appendChild(aiChatBox);
    generateApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
    userMessage = prompt.value;
    
    // Check if the prompt is empty
    if (userMessage === "") {
        return; // Don't proceed if input is empty
    }
    
    // Show the container once the user has started typing
    container.style.display = "none";  // Hide the initial container with the title
    
    // Create user message chat box
    const html = `<div id="img">
                    <img src="user.png" alt="">
                </div>
                <div class="text"></div>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    ChatContainer.appendChild(userChatBox);
    
    // Clear prompt input
    prompt.value = "";
    
    // Show loading after a delay
    setTimeout(showLoading, 500);
});
