import { PrismaMoviesRepository } from "@/repository/prisma/prisma-movies-repository";
import { GetAllMoviesService } from "../get-all-movies";

export function makeGetAllMoviesService() {
  const prismaMoviesRepository = new PrismaMoviesRepository();
  const getAllMoviesService = new GetAllMoviesService(prismaMoviesRepository);

  return getAllMoviesService;
}
