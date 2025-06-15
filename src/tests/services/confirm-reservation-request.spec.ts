import { InMemoryReservationRepository } from "@/repository/in-memory/in-memory-reservation-repository";
import { ConfirmReserveSeatService } from "@/services/confirm-reservation-request";
import { AccessDeniedError } from "@/services/errors/access-denied";
import { ReservationExpiredError } from "@/services/errors/reservation-expired";
import { ReservationNotFoundError } from "@/services/errors/reservation-not-found";
import { randomUUID } from "crypto";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryReservationRepository: InMemoryReservationRepository;
let sut: ConfirmReserveSeatService;

describe("Reservation confirmed seat service", () => {
  beforeEach(() => {
    inMemoryReservationRepository = new InMemoryReservationRepository();
    sut = new ConfirmReserveSeatService(inMemoryReservationRepository);
  });
  it("Deve disparar erro de reserva não encontrada caso ela não exista", async () => {
    await expect(() =>
      sut.execute({ userId: "123", reservationId: "inexistente" })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });

  it("Deve disparar access denied error se a reservar nao pertencer ao usuario", async () => {
    const reservation = await inMemoryReservationRepository.create({
      id: randomUUID(),
      userId: "user-1",
      seatId: "seat-1",
      expiresAt: new Date(Date.now() + 1000 * 60 * 10),
      confirmed: false,
    });
    await expect(() =>
      sut.execute({ userId: "user-2", reservationId: reservation.id })
    ).rejects.toBeInstanceOf(AccessDeniedError);
  });

  it("Deve lançar ReservationExpiredError se a reserva ja tiver sido expirada", async () => {
    const reservation = await inMemoryReservationRepository.create({
      userId: "user1",
      seatId: "seat1",
      expiresAt: new Date(Date.now() - 1000 * 60),
      confirmed: false,
    });
    await expect(() =>
      sut.execute({ userId: "user1", reservationId: reservation.id })
    ).rejects.toBeInstanceOf(ReservationExpiredError);
  });
  it("deve confirmar a reserva com sucesso", async () => {
    const reservation = await inMemoryReservationRepository.create({
      userId: "user1",
      seatId: "seat1",
      expiresAt: new Date(Date.now() + 1000 * 60 * 10),
      confirmed: false,
    });

    const result = await sut.execute({
      userId: "user1",
      reservationId: reservation.id,
    });

    expect(result.reservation.confirmed).toBe(true);
    expect(result.reservation.id).toBe(reservation.id);
  });
});
