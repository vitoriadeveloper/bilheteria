import { ReservationsRepository } from "@/repository/reservation-repository";
import { SeatsRepository } from "@/repository/seats-repository";
import { UsersRepository } from "@/repository/users-repository";
import { Reservation } from "@prisma/client";
import { InvalidSeatError } from "./errors/seat-invalid";
import { UserNotFoundError } from "./errors/user-not-found";
import { SeatAlreadyReservedError } from "./errors/seat-already-reserved";

interface ReserveSeatRequest {
  userId: string;
  sessionId: string;
  seatId: string;
}

interface ReserveSeatResponse {
  reservation: Reservation;
}

export class ReserveSeatService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly seatsRepository: SeatsRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    sessionId,
    seatId,
  }: ReserveSeatRequest): Promise<ReserveSeatResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const seat = await this.seatsRepository.findById(seatId);
    if (!seat || seat.sessionId !== sessionId) {
      throw new InvalidSeatError();
    }

    if (seat.Reservation) {
      throw new SeatAlreadyReservedError();
    }

    const reservation = await this.reservationsRepository.create({
      userId,
      seatId,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), //15min
      confirmed: false,
    });

    return { reservation };
  }
}
