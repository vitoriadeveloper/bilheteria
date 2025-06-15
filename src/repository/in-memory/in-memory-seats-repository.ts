import { SeatsRepository } from "../seats-repository";
import { SeatWithReservation } from "@/utils/customize-type";

export class InMemorySeatRepository implements SeatsRepository {
  public seats: SeatWithReservation[] = [];
  async findById(id: string) {
    const seat = this.seats.find((seat) => seat.id === id);
    return seat ?? null;
  }
  async findAvailableSeatsBySession(sessionId: string) {
    const now = new Date();
    const availableSeats = this.seats.filter((seat) => {
      if (seat.sessionId !== sessionId) return false;
      const reservation = seat.Reservation;
      if (!reservation) return true;
      if (!reservation.confirmed && reservation.expiresAt < now) return true;
      return false;
    });
    return availableSeats;
  }
}
