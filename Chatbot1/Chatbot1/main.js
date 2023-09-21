const sendBtn = document.getElementById("sendBtn");
const messageBox = document.querySelector(".message-box");
const messageBar = document.querySelector(".message-bar-input");
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

sendBtn.onclick = function () {
    if (messageBar.value.length > 0) {
        let message = `<div class="chat">
            <img src="user.jpg" alt="none">
            <span>${messageBar.value}</span>
        </div>`;

        messageBox.insertAdjacentHTML("beforeend", message);

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant."
                    },
                    {
                        "role": "user",
                        "content": messageBar.value
                    }
                ]
            })
        };

        async function fetchData() {
            try {
                const res = await fetch(API_URL, requestOptions);
        
                if (res.status == 429) {
                    throw new Error("Rate limit exceeded");
                }
        
                const data = await res.json();
        
                if (data.choices && data.choices.length > 0) {
                    let response = `<div class="chat response">
                        <img src="logo.jpg">
                        <span>${data.choices[0].message.content}</span>
                    </div>`;
                    messageBox.insertAdjacentHTML("beforeend", response);
                } else {
                    let errorMessage = `<div class="chat response">
                        <img src="logo.jpg">
                        <span>An error occurred while processing your request.</span>
                    </div>`;
                    messageBox.insertAdjacentHTML("beforeend", errorMessage);
                }
            } catch (error) {
                let errorMessage = `<div class="chat response">
                    <img src="logo.jpg">
                    <span>${error.message}</span>
                </div>`;
                messageBox.insertAdjacentHTML("beforeend", errorMessage);
            }
        }
         try {
            fetchData();
        } catch (error) {
            let errorMessage = `<div class="chat response">
                <img src="logo.jpg">
                <span>${error.message}</span>
            </div>`;
            messageBox.insertAdjacentHTML("beforeend", errorMessage);
        }
       
        messageBar.value = "";
    }
}
