import { ReservationsRepository } from "@/repository/reservation-repository";
import { ReservationNotFoundError } from "./errors/reservation-not-found";
import { AccessDeniedError } from "./errors/access denied";
import { ReservationAlreadyConfirmed } from "./errors/reservation-already-confirmed";
import { ReservationExpiredError } from "./errors/reservation-expired";

interface ConfirmReserveSeatRequest {
  userId: string;
  reservationId: string;
}

export class ConfirmReserveSeatService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) {}

  async execute({ userId, reservationId }: ConfirmReserveSeatRequest) {
    const reservation = await this.reservationsRepository.findById(
      reservationId
    );

    if (!reservation) throw new ReservationNotFoundError();
    if (reservation.userId !== userId) throw new AccessDeniedError();
    if (reservation.confirmed) throw new ReservationAlreadyConfirmed();
    if (reservation.expiresAt < new Date()) throw new ReservationExpiredError();

    const confirmedReservation = await this.reservationsRepository.confirm(
      reservationId
    );

    return { reservation: confirmedReservation };
  }
}
