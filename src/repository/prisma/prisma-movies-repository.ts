import { MoviesRepository } from "../movies-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMoviesRepository implements MoviesRepository {
  async getAll() {
    return await prisma.movie.findMany({
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
