// import { MovieModel } from "../models/local-file-system/movies.js";
import { MovieModel } from "../models/mysql/movies.js";
import { partialValidateMovie, validateMovie } from "../schemas/movieSchema.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  getAll = async (req, res) => {
    const { genre, search } = req.query;
    const movies = await this.movieModel.getAll({ genre, search });
    res.json(movies);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await this.movieModel.create({ input: result.data });
    res.status(200).json({ message: "created correctly 😃", newMovie });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.movieModel.delete({ id });
    if (result) {
      res.status(200).json({ message: "Movie deleted 👍" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = partialValidateMovie(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data,
    });
    if (updatedMovie) {
      res.status(200).json({ message: "Updated correctly 😃", updatedMovie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  };
}
