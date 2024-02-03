import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const credentials = {
  yourUsername: "",
  yourPassword: "",
  yourAPIKey: "",
  yourBearerToken: "",
};

app.get("/", (req, res) => {
  res.render("Leccion62.ejs", { content: "API Response." });
});

const makeRequest = async (url, options, res) => {
  try {
    const result = await axios.get(url, options);
    res.render("Leccion62.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

app.get("/noAuth", async (req, res) => {
  await makeRequest(`${API_URL}/random`, null, res);
});

app.get("/basicAuth", async (req, res) => {
  await makeRequest(`${API_URL}/all?page=2`, {
    auth: {
      username: credentials.yourUsername,
      password: credentials.yourPassword,
    },
  }, res);
});

app.get("/apiKey", async (req, res) => {
  await makeRequest(`${API_URL}/filter`, {
    params: {
      score: 5,
      apiKey: credentials.yourAPIKey,
    },
  }, res);
});

const config = {
  headers: { Authorization: `Bearer ${credentials.yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  await makeRequest(`${API_URL}/secrets/2`, config, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
