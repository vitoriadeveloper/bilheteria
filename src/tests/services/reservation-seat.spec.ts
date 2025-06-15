import { InMemoryReservationRepository } from "@/repository/in-memory/in-memory-reservation-repository";
import { InMemorySeatRepository } from "@/repository/in-memory/in-memory-seats-repository";
import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-users-repository";
import { SeatAlreadyReservedError } from "@/services/errors/seat-already-reserved";
import { InvalidSeatError } from "@/services/errors/seat-invalid";
import { UserNotFoundError } from "@/services/errors/user-not-found";
import { ReserveSeatService } from "@/services/reservation-seat";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryReservationRepository: InMemoryReservationRepository;
let inMemorySeatRepository: InMemorySeatRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: ReserveSeatService;

describe("Reservation seat service", () => {
  beforeEach(() => {
    inMemoryReservationRepository = new InMemoryReservationRepository();
    inMemorySeatRepository = new InMemorySeatRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new ReserveSeatService(
      inMemoryReservationRepository,
      inMemorySeatRepository,
      inMemoryUsersRepository
    );
  });
  it("Deve reservar um assento com sucesso", async () => {
    const user = await inMemoryUsersRepository.create({
      id: "random-1",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const seat = {
      id: "seat-2",
      row: "B",
      number: 2,
      sessionId: "wrong-session-id",
      Reservation: null
    };
    inMemorySeatRepository.seats.push(seat);

    const result = await sut.execute({
      userId: user.id,
      seatId: seat.id,
      sessionId: seat.sessionId,
    });

    expect(result).toHaveProperty("reservation");
    expect(result.reservation.userId).toBe(user.id);
    expect(result.reservation.seatId).toBe(seat.id);
    expect(result.reservation.confirmed).toBe(false);
  });

  it("Deve lançar erro se o usuário não existir", async () => {
    await expect(
      sut.execute({
        userId: "naoexistente",
        seatId: "tratratra",
        sessionId: "123",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("Deve lançar um erro se o assento não pertencer a sessão informada", async () => {
    const user = await inMemoryUsersRepository.create({
      id: "random-id",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const seat = {
      id: "seat-2",
      row: "B",
      number: 2,
      sessionId: "wrong-session-id",
    };
    await expect(() =>
      sut.execute({
        userId: user.id,
        seatId: seat.id,
        sessionId: "different-session",
      })
    ).rejects.toBeInstanceOf(InvalidSeatError);
  });
  it("Deve lançar erro se o assento já estiver reservado", async () => {
    const user = await inMemoryUsersRepository.create({
      id: "random-id",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const seat = {
      id: "seat-3",
      row: "C",
      number: 3,
      sessionId: "session-3",
      Reservation: {
        id: "resv-1",
        userId: "another-user",
        seatId: "seat-3",
        confirmed: false,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        seat: {} as any,
        user: {} as any,
      },
    };

    inMemorySeatRepository.seats.push(seat as any);
    await expect(() =>
      sut.execute({
        userId: user.id,
        seatId: seat.id,
        sessionId: seat.sessionId,
      })
    ).rejects.toBeInstanceOf(SeatAlreadyReservedError);
  });
    it("Deve definir expiresAt com 15 minutos após a criação", async () => {
    const user = await inMemoryUsersRepository.create({
      id: "user-15min",
      email: "test@example.com",
      password: "123456",
    });

    const seat = {
      id: "seat-15min",
      row: "A",
      number: 1,
      sessionId: "session-15min",
      Reservation: null,
    };

    inMemorySeatRepository.seats.push(seat);

    const before = Date.now();
    const { reservation } = await sut.execute({
      userId: user.id,
      seatId: seat.id,
      sessionId: seat.sessionId,
    });
    const after = Date.now();

    const expectedMin = before + 15 * 60 * 1000;
    const expectedMax = after + 15 * 60 * 1000;

    const actual = reservation.expiresAt.getTime();

    expect(actual).toBeGreaterThanOrEqual(expectedMin);
    expect(actual).toBeLessThanOrEqual(expectedMax);
  });

});
