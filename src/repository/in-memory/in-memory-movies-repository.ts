import { MoviesRepository } from "../movies-repository";
import { MovieWithSessionsAndSeats } from "@/utils/customize-type";

export class InMemoryMoviesRepository implements MoviesRepository {
  public movies: MovieWithSessionsAndSeats[] = [];

  async getAll(): Promise<MovieWithSessionsAndSeats[]> {
    return this.movies;
  }
}
