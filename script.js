document.getElementById('sendButton').addEventListener('click', async () => {
    const inputField = document.getElementById('messageInput');
    const mediaInput = document.getElementById('mediaInput');
    
    const message = inputField.value;
    const file = mediaInput.files[0];

    const formData = new FormData();
    formData.append('message', message);
    if (file) {
        formData.append('media', file);
    }

    // Display user message
    displayMessage(message, 'user-message');
    if (file) {
        displayMedia(file);
    }

    // Send message to the API
    const response = await fetch('/api', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    // Display AI response
    displayMessage(data.reply, 'ai-message');

    // Clear input fields
    inputField.value = '';
    mediaInput.value = '';
});

function displayMessage(message, className) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

function displayMedia(file) {
    const chatBox = document.getElementById('chatBox');
    const mediaElement = document.createElement('div');
    mediaElement.className = 'user-message';

    const reader = new FileReader();
    reader.onload = function(e) {
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            mediaElement.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            mediaElement.appendChild(video);
        }
        chatBox.appendChild(mediaElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    };
    reader.readAsDataURL(file);
}