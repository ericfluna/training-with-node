import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Title required",
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: "Poster must be a valid url",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
      "Crime"
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
  rate: z.number().min(0).max(10).default(5),
});

export function validateMovie(movie) {
  return movieSchema.safeParse(movie);
}

export function partialValidateMovie(movie) {
  return movieSchema.partial().safeParse(movie);
}

