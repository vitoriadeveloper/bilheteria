import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllMoviesService } from "@/services/factories/make-get-all-movies-service";
import { MoviesNotFound } from "@/services/errors/movies-not-found";

export async function getAllMovies(_: FastifyRequest, res: FastifyReply) {
  try {
    const getAllMoviesService = makeGetAllMoviesService();
    const { movies } = await getAllMoviesService.execute();

    return res.status(200).send(movies);
  } catch (err) {
    if (err instanceof MoviesNotFound) {
      return res.status(404).send({ message: err.message });
    }
    return res.status(500).send();
  }
}
