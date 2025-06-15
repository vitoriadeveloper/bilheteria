import { InMemoryReservationRepository } from "@/repository/in-memory/in-memory-reservation-repository";
import { DeleteReservationSeatService } from "@/services/delete-reservation-seat";
import { ReservationNotFoundError } from "@/services/errors/reservation-not-found";
import { randomUUID } from "crypto";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryReservationRepository: InMemoryReservationRepository;
let sut: DeleteReservationSeatService;

describe("Delete Reservation seat service", () => {
  beforeEach(() => {
    inMemoryReservationRepository = new InMemoryReservationRepository();
    sut = new DeleteReservationSeatService(inMemoryReservationRepository);
  });
  it("Deve deletar uma reserva de um assento com sucesso", async () => {
    const reservation = await inMemoryReservationRepository.create({
      id: randomUUID(),
      userId: "user-1",
      seatId: "seat-1",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      confirmed: false,
    });

    await sut.execute({ reservationId: reservation.id });
    const deleted = await inMemoryReservationRepository.findById(
      reservation.id
    );
    expect(deleted).toBe(null);
  });
  it("Deve lançar erro se a reserva não existir", async () => {
    await expect(() =>
      sut.execute({ reservationId: "12425" })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });
});
