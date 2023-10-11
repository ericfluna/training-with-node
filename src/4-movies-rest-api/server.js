import express from "express";
import crypto from "node:crypto";
import cors from "cors";
import { partialValidateMovie, validateMovie } from "./schemas/movieSchema.js";
import { readJson } from "./utils.js";

let movies = readJson("./movies.json");

const app = express();
const port = process.env.PORT ?? 1234;
app.disable("x-powered-by");
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === "http://127.0.0.1:5500" || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/movies", (req, res) => {
  const { genre, search } = req.query;

  let filteredMovies = movies;

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  if (search) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filteredMovies.length > 0) {
    res.status(200).json(filteredMovies);
  } else {
    res.status(404).json({ message: "movies not founded" });
  }
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const filterMovies = movies.find((movie) => movie.id === id);

  if (filterMovies) {
    res.status(200).json(filterMovies);
  } else {
    res.status(404).json({ message: "movie not found" });
  }
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);
  res.status(200).json({ message: "created correctly 😃", newMovie });
});

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;

  let result = partialValidateMovie(req.body);

  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) });


  let updatedMovie = movies.find((movie) => movie.id === id);

  if (!updatedMovie) return res.status(404).json({ error: "movie not found" });

  updatedMovie = { ...updatedMovie, ...result.data };

  movies = movies.map((movie) => (movie.id === id ? updatedMovie : movie));

  res.status(200).json({ message: "updated correctly 😃", updatedMovie });
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port} !`)
);
