import { SeatsRepository } from "../seats-repository";
import { SeatWithReservation } from "@/utils/customize-type";

export class InMemorySeatRepository implements SeatsRepository {
  public seats: SeatWithReservation[] = [];
  async findById(id: string) {
    const seat = this.seats.find((seat) => seat.id === id);
    return seat ?? null;
  }
}
