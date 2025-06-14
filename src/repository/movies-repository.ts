import { MovieWithSessionsAndSeats } from "@/utils/customize-type";

export interface MoviesRepository {
  getAll(): Promise<MovieWithSessionsAndSeats[]>;
}
