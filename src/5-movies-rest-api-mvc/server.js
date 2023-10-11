import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/corsConfig.js";
export async function serverStart({movieModel}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(corsMiddleware());

  app.use("/movies", createMovieRouter({ movieModel }));

  app.use((req, res) => {
    res.status(404).send("<h1>404</h1>");
  });

  const port = process.env.PORT ?? 1234;

  app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port} !`)
  );
}


