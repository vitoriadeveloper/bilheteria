import { randomUUID } from "node:crypto";
import { ReservationsRepository } from "../reservation-repository";
import { Prisma, Reservation } from "@prisma/client";

export class InMemoryReservationRepository implements ReservationsRepository {
  public reservations: Reservation[] = [];
  async findById(id: string) {
    const reservation = this.reservations.find((res) => res.id === id);
    return reservation ?? null;
  }
  async create(data: Prisma.ReservationUncheckedCreateInput) {
    const reservation = {
      id: randomUUID(),
      userId: data.userId,
      seatId: data.seatId,
      expiresAt:
        data.expiresAt instanceof Date
          ? data.expiresAt
          : new Date(data.expiresAt),
      confirmed: data.confirmed ?? false,
    };

    this.reservations.push(reservation);

    return reservation;
  }

  async delete(reservationId: string) {
    this.reservations.filter((reservation) => reservation.id !== reservationId);
  }
}
