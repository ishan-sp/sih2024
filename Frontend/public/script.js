document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    // Toggle the menu visibility
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    
    event.stopPropagation(); // Prevent the click event from bubbling up
});

// Close the dropdown-menu if clicking outside of it
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block' && !event.target.matches('#menu-toggle')) {
        menu.style.display = 'none';
    }
});
document.getElementById('username-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    var dropdown = document.querySelector('.username-dropdown');
    dropdown.classList.toggle('active');
});

// Close the dropdown if clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('#username-toggle')) {
        var dropdowns = document.getElementsByClassName("username-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('active')) {
                openDropdown.classList.remove('active');
            }
        }
    }
};

function enableEdit(inputId) {
    const inputField = document.getElementById(inputId);
    const icon = inputField.nextElementSibling;

    if (inputField.hasAttribute('readonly')) {
        // If the field is in read-only mode, enable editing
        inputField.removeAttribute('readonly');
        inputField.focus();
        icon.classList.remove('fa-pencil-alt');
        icon.classList.add('fa-save'); // Change icon to save
    } else {
        // Save the input and disable editing
        inputField.setAttribute('readonly', true);
        icon.classList.remove('fa-save');
        icon.classList.add('fa-pencil-alt'); // Change icon back to edit
    }
}

function openChatbot() {
    document.getElementById('chatbot-window').style.display = 'flex';
}

// Function to close the chatbot window
function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
}

// Handle the "Enter" key press for sending messages
function handleInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to send the message

function selectPrompt(promptText) {
    document.getElementById("chatbox").value = promptText;
}
function selectPrompt(promptText) {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Set the selected prompt text in the input field
    chatInput.value = promptText;

    // Enable the send button since a prompt was selected
    sendButton.disabled = false;
}


// Function to check if input box has content
function checkInput() {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Log current value for debugging
    console.log(`Current input value: "${chatInput.value.trim()}"`);

    if (chatInput.value.trim() === "") {
        sendButton.disabled = true;  // Disable the button if the input is empty
        sendButton.style.cursor = "not-allowed";  // Change cursor to indicate disabled state
    } else {
        sendButton.disabled = false;  // Enable the button if the input has text
        sendButton.style.cursor = "pointer";  // Change cursor to indicate it's clickable
    }
}

// Function to send the message
function sendMessage() {
    const chatInput = document.getElementById("chatbox");
    const message = chatInput.value.trim();
    if (message !== "") {
        fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usermsg: message })  // Correct: stringified JSON
        })
        .then(response => response.json())
        .then(data => {
            const chatContent = document.querySelector('.chat-messages'); // Ensure this selector matches your chat container
            const userMessage = document.createElement('div');
            userMessage.classList.add('user-message');
            userMessage.textContent = message;
            chatContent.appendChild(userMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            chatInput.value = "";
            document.getElementById("send-btn").disabled = true; 
            document.querySelector('.suggested-prompts').style.display = 'none';
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.response;
            chatContent.appendChild(botMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            document.getElementById("send-btn").disabled = false;
        });
        
    }
}
