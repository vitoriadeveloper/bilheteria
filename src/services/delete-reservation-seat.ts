import { ReservationsRepository } from "@/repository/reservation-repository";
import { ReservationNotFoundError } from "./errors/reservation-not-found";
import { ReservationAlreadyConfirmed } from "./errors/reservation-already-confirmed";

interface DeleteReservationSeatServiceRequest {
  reservationId: string;
}

export class DeleteReservationSeatService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) {}

  async execute({ reservationId }: DeleteReservationSeatServiceRequest) {
    const reservation = await this.reservationsRepository.findById(
      reservationId
    );

    if (!reservation) {
      throw new ReservationNotFoundError();
    }
    if (reservation.confirmed) {
      throw new ReservationAlreadyConfirmed();
    }

    await this.reservationsRepository.delete(reservationId);
  }
}
