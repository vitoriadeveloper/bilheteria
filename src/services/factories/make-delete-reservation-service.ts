import { PrismaReservationRepository } from "@/repository/prisma/prisma-reservation-repository";
import { DeleteReservationSeatService } from "../delete-reservation-seat";

export function makeDeleteReservationService() {
  const reservationsRepository = new PrismaReservationRepository();
  const deleteReservationService = new DeleteReservationSeatService(
    reservationsRepository
  );

  return deleteReservationService;
}
