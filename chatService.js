const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { queryEmbedding } = require('./embeddingService');

const app = express();
app.use(express.json());

let chatSessions = {};

app.post('/api/chat/start', (req, res) => {
    const { assetId } = req.body;
    const chatId = uuidv4();
    chatSessions[chatId] = { assetId, history: [] };
    res.json({ chatId });
});


app.post('/api/chat/message', async (req, res) => {
    const { chatId, message } = req.body;
    const session = chatSessions[chatId];

    if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
    }

    try {
        const embeddings = await queryEmbedding(session.assetId);
        const response = `Echoing your message with asset ID: ${session.assetId}`;

        session.history.push({ message, response });
        res.json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve embeddings' });
    }
});

app.get('/api/chat/history', (req, res) => {
    const { chatId } = req.query;
    const session = chatSessions[chatId];

    if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({ history: session.history });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Chat server is running on port ${PORT}`);
});
