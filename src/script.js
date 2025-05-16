document.getElementById('sendButton').addEventListener('click', () => {
    const webhookUrl = document.getElementById('webhookUrl').value;
    const messageType = document.getElementById('messageType').value;
    const messageContent = document.getElementById('messageContent').value;

    let payload = {};

    if (messageType === 'normal') {
        payload = {
            content: messageContent
        };
    } else if (messageType === 'embed') {
        const embedTitle = document.getElementById('embedTitle').value;
        const embedDescription = document.getElementById('embedDescription').value;
        let embedFooter = document.getElementById('embedFooter').value;
        const embedColor = document.getElementById('embedColor').value.replace('#', '');
        const embedImageUrl = document.getElementById('embedImageUrl').value;

        if (embedFooter.trim() === '') {
            embedFooter = 'Dev by https://tamino1230.github.io';
        } else {
            embedFooter += ' | Dev by https://tamino1230.github.io';
        };

        payload = {
            embeds: [
                {
                    title: embedTitle,
                    description: embedDescription,
                    footer: { text: embedFooter },
                    color: parseInt(embedColor, 16),
                    ...(embedImageUrl.trim() !== '' ? { image: { url: embedImageUrl } } : {})
                }
            ]
        };
    }

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message. Please check the webhook URL.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the message.');
    });
});
