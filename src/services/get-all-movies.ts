import { MoviesRepository } from "@/repository/movies-repository";
import { MovieWithSessionsAndSeats } from "@/utils/customize-type";

interface GetAllMoviesServiceResponse {
  movies: MovieWithSessionsAndSeats[];
}

export class GetAllMoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}
  async execute(): Promise<GetAllMoviesServiceResponse> {
    const movies = await this.moviesRepository.getAll();

    return {
      movies,
    };
  }
}
