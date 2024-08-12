const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const embeddingsDir = path.join(__dirname, 'embeddings');
if (!fs.existsSync(embeddingsDir)) {
    fs.mkdirSync(embeddingsDir);
}


async function createEmbedding(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const embeddings = content.split('').map(char => char.charCodeAt(0));
    return embeddings;
}

async function storeEmbedding(embeddings, fileName) {
    const assetId = uuidv4();
    const embeddingFilePath = path.join(embeddingsDir, `${assetId}.json`);

    fs.writeFileSync(embeddingFilePath, JSON.stringify({ embeddings, fileName }));

    return assetId;
}


async function queryEmbedding(assetId) {
    const embeddingFilePath = path.join(embeddingsDir, `${assetId}.json`);

    if (fs.existsSync(embeddingFilePath)) {
        const data = JSON.parse(fs.readFileSync(embeddingFilePath, 'utf-8'));
        return data.embeddings;
    } else {
        throw new Error('Embedding not found');
    }
}

module.exports = { createEmbedding, storeEmbedding, queryEmbedding };
