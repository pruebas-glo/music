// const express = require('express');
// const app = express();
// const port = 8080;

// app.get('/song1', (req, res) => {
//     res.sendFile(__dirname + '/music/song1.mp3');
// });

// app.get('/song2', (req, res) => {
//     res.sendFile(__dirname + '/music/song2.mp3');
// });

// app.listen(port, () => {
//     console.log(`Backend server listening at http://localhost:${port}`);
// });

const express = require('express');
const { google } = require('googleapis');
const app = express();
const path = require('path');
const port = 8080;

const CLIENT_ID = '40402016141-ed6au5iqfubbnrshfo6chns0d7rntb83.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8080/auth/callback';
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generar la URL de autorización
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

app.get('/auth', (req, res) => {
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Autenticación exitosa');
  } catch (error) {
    console.error('Error en la autenticación:', error);
  }

  res.redirect('/');
});

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas para la música
app.get('/song1', (req, res) => {
  res.sendFile(path.join(__dirname, 'music/song1.mp3'));
});

app.get('/song2', (req, res) => {
  res.sendFile(path.join(__dirname, 'music/song2.mp3'));
});

// Ruta para cualquier otra solicitud
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});