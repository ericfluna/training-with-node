import { createServer } from "node:http"; // protocolo HTTP
import { readFile } from "node:fs";

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.end('<div><h1>Mi página</h1><a href="/pikachu">Pikachu</a></div>');
  } else if (req.url === "/pikachu") {
    readFile("./pikachu.jpg", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>500 Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url === "/contacto") {
    res.end("<h1>Contacto</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404</h1>");
  }
};

const server = createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
