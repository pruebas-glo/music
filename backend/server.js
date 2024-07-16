const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const app = express();
const port = 8080;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

app.get('/song1', (req, res) => {
    res.sendFile(path.join(__dirname, 'music', 'song1.mp3'));
});

app.get('/song2', (req, res) => {
    res.sendFile(path.join(__dirname, 'music', 'song2.mp3'));
});

app.get('/youtube-search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                key: youtubeApiKey,
                maxResults: 10
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
