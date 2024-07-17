// const express = require('express');
// const app = express();
// const port = 8080;

// app.get('/song', (req, res) => {
//     res.sendFile(__dirname + '/music/song.mp3');
// });

// app.listen(port, () => {
//     console.log(`Backend server listening at http://localhost:${port}`);
// });

const express = require('express');
const app = express();
const port = 8080;

app.get('/song1', (req, res) => {
    res.sendFile(__dirname + '/music/song1.mp3');
});

app.get('/song2', (req, res) => {
    res.sendFile(__dirname + '/music/song2.mp3');
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});