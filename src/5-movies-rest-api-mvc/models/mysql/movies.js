import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  poer: "3306",
  password: "root",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre, search }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie;`
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return movies;
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate } = input;
    const [uuidResult] = await connection.query("SELECT uuid() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
    (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (error) {
      throw new Error("Error en el create");
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {
    const [movies] = await connection.query(
      `DELETE FROM movie WHERE id=UUID_TO_BIN(?);`,
      [id]
    );

    return movies.affectedRows>0
  }

  static async update({ id, input }) {

    const { title, year, director, duration, poster, rate } = input;

    const [movies] = await connection.query(
      `UPDATE movie
      SET ${title ? `title = '${title}',` : ''} 
          ${year ? `year = ${year},` : ''}
          ${director ? `director = '${director}',` : ''}
          ${duration ? `duration = ${duration},` : ''}
          ${poster ? `poster = '${poster}',` : ''}
          ${rate ? `rate = ${rate},` : ''}
      WHERE id = ?;`,
      [id]
    );
    
    return movies.affectedRows>0
    
  }
}
