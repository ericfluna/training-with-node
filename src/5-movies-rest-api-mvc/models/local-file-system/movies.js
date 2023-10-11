import { createRequire } from "node:module";
import crypto from "node:crypto";

const require = createRequire(import.meta.url);
let movies = require("../../movies.json");

export class MovieModel {
  static async getAll({ genre, search }) {
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

    return filteredMovies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input,
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);

    return true;
  }

  static async update({ id, input }) {
    let updatedMovie = movies.find((movie) => movie.id === id);

    if (!updatedMovie)
      return false

    updatedMovie = { ...updatedMovie, ...input };

    movies = movies.map((movie) => (movie.id === id ? updatedMovie : movie));

    return updatedMovie
  }
}
