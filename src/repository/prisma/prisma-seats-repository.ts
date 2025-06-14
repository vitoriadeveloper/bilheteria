import { SeatsRepository } from "../seats-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSeatsRepository implements SeatsRepository {
  async findById(id: string) {
    const seat = await prisma.seat.findUnique({
      where: { id },
      include: {
        Reservation: true,
      },
    });

    return seat;
  }
}
