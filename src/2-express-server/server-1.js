import express from "express";
import { readFile } from "node:fs";

const app = express();

app.get("/", (req, res) =>
  res.send('<div><h1>Mi página</h1><a href="/pikachu">Pikachu</a></div>')
);

app.get("/pikachu", (req, res) => {
  readFile("./pikachu.jpg", (err, data) => {
    if (err) {
      res.status(500).send("<h1>500 Internal Server Error</h1>");
    } else {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});

app.get("/contacto", (req, res) => res.send("<h1>Contacto</h1>"));

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});
const port = process.env.PORT ?? 1234;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
