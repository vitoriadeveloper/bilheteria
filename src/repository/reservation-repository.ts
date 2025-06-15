import { Reservation, Prisma } from "@prisma/client";

export interface ReservationsRepository {
  findById(id: string): Promise<Reservation | null>;
  create(data: Prisma.ReservationUncheckedCreateInput): Promise<Reservation>;
  delete(reservationId: string): Promise<void>;
  confirm(reservationId: string): Promise<Reservation>;
}
