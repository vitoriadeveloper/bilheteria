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

  async findAvailableSeatsBySession(sessionId: string) {
    const reservedSeatIds = await prisma.reservation.findMany({
      where: {
        confirmed: true,
        seat: {
          sessionId,
        },
      },
      select: {
        seatId: true,
      },
    });
    const reservedIdsSet = reservedSeatIds.map((r) => r.seatId);
    const availableSeats = await prisma.seat.findMany({
      where: {
        sessionId,
        id: {
          notIn: reservedIdsSet,
        },
      },
    });

    return availableSeats;
  }
}
