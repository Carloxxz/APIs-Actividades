import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "0d0ff19d-e95f-425e-94f7-00d0e21c565a";
const config = { headers: { Authorization: `Bearer ${yourBearerToken}` } };

app.use(bodyParser.urlencoded({ extended: true }));

// Función para manejar todas las solicitudes
const handleRequest = async (method, endpoint, req, res) => {
  try {
    const result = await axios[method](API_URL + endpoint, req.body, config);
    res.render('Leccion63.ejs', { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render('Leccion63.ejs', { content: JSON.stringify(error.response.data) });
  }
};

// Métodos de Express para cada tipo de solicitud
app.get('/', (req, res) => {
  res.render('Leccion63.ejs', { content: 'Waiting for data...' });
});

app.post('/get-secret', async (req, res) => {
  const searchId = req.body.id;
  await handleRequest('get', `/secrets/${searchId}`, req, res);
});

app.post('/post-secret', async (req, res) => {
  await handleRequest('post', '/secrets', req, res);
});

app.post('/put-secret', async (req, res) => {
  const searchId = req.body.id;
  await handleRequest('put', `/secrets/${searchId}`, req, res);
});

app.post('/patch-secret', async (req, res) => {
  const searchId = req.body.id;
  await handleRequest('patch', `/secrets/${searchId}`, req, res);
});

app.post('/delete-secret', async (req, res) => {
  const searchId = req.body.id;
  await handleRequest('delete', `/secrets/${searchId}`, req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

