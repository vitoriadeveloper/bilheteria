import { PrismaReservationRepository } from "@/repository/prisma/prisma-reservation-repository";
import { ConfirmReserveSeatService } from "../confirm-reservation-request";

export function makeConfirmReservationService() {
  const reservationsRepository = new PrismaReservationRepository();
  const confirmServationService = new ConfirmReserveSeatService(
    reservationsRepository
  );

  return confirmServationService;
}
