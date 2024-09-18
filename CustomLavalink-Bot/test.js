const axios = require('axios');

const botToken = 'YOUR_BOT_TOKEN_HERE'; // Replace with your bot token
const channelId = 'YOUR_CHANNEL_ID_HERE'; // Replace with the actual channel ID
const interactionToken = 'YOUR_INTERACTION_TOKEN_HERE'; // Replace with the actual interaction token
const clientId = 'YOUR_CLIENT_ID_HERE'; // Replace with your bot's client ID

// Function to create a message with a button


const createMessage = async () => {
    try {
        const response = await axios.post(
            `https://discord.com/api/v10/channels/${channelId}/messages`,
            {
                content: 'Click the button below:',
                components: [
                    {
                        type: 1, // ActionRow
                        components: [
                            {
                                type: 2, // Button
                                style: 1, // Primary
                                label: 'Press Me',
                                custom_id: 'button_pressed', // Identifier for the button
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bot ${botToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 201) {
        } else {
            console.error(`Failed to create message. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating message:', error.message);
    }
};

// Function to send a reply when the button is pressed
const sendReply = async (interactionId) => {
    try {
        const response = await axios.post(
            `https://discord.com/api/v10/interactions/${interactionId}/${interactionToken}/callback`,
            {
                type: 4, // Send a message
                data: {
                    content: 'Button pressed!',
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
        } else {
            console.error(`Failed to send reply. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending reply:', error.message);
    }
};

// Listen for interactions
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can choose any port

app.use(bodyParser.json());

app.post('/interactions', (req, res) => {
    const interaction = req.body;
    const interactionType = interaction.type;

    if (interactionType === 1) {
        // Interaction is a button press
        const customId = interaction.data.custom_id;

        if (customId === 'button_pressed') {
            // Handle the button press
            const interactionId = interaction.id;
            sendReply(interactionId);
        }
    }

    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create the message with the button
createMessage();
