import { ReservationsRepository } from "@/repository/reservation-repository";
import { ReservationNotFoundError } from "./errors/reservation-not-found";

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

    await this.reservationsRepository.delete(reservationId);
  }
}
