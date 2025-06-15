import { PrismaSeatsRepository } from "@/repository/prisma/prisma-seats-repository";
import { GetAvailableSeatsService } from "../get-available-seats";

export function makeGetAvailableSeatsService() {
  const prismaSeatsRepository = new PrismaSeatsRepository();
  const getAvailableSeatsService = new GetAvailableSeatsService(
    prismaSeatsRepository
  );

  return getAvailableSeatsService;
}
