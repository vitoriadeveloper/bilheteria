import { MoviesRepository } from "../movies-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMoviesRepository implements MoviesRepository {
  getAll() {
    return prisma.movie.findMany({
      include: {
        Session: {
          include: {
            seats: true,
          },
        },
      },
    });
  }
}
