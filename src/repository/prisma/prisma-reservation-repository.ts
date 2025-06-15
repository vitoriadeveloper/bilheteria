import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ReservationsRepository } from "../reservation-repository";

export class PrismaReservationRepository implements ReservationsRepository {
  async findById(id: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });
    return reservation;
  }
  async create(data: Prisma.ReservationUncheckedCreateInput) {
    const reservation = await prisma.reservation.create({
      data,
    });

    return reservation;
  }

  async delete(reservationId: string) {
    await prisma.reservation.delete({
      where: { id: reservationId },
    });
  }
}
