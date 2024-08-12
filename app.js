const express = require('express');
const multer = require('multer');
const { createEmbedding, storeEmbedding } = require('./embeddingService');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());


app.post('/api/documents/process', upload.single('document'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const embeddings = await createEmbedding(filePath);
        const assetId = await storeEmbedding(embeddings, req.file.originalname);
        res.json({ assetId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process document' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Document processing server is running on port ${PORT}`);
});
