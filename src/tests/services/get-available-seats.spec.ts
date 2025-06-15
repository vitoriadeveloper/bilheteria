import { InMemorySeatRepository } from "@/repository/in-memory/in-memory-seats-repository";

import { GetAvailableSeatsService } from "@/services/get-available-seats";
import { SeatWithReservation } from "@/utils/customize-type";
import { randomUUID } from "node:crypto";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryAvailableRepository: InMemorySeatRepository;
let sut: GetAvailableSeatsService;

describe("Get all available seats by session service", () => {
  beforeEach(() => {
    inMemoryAvailableRepository = new InMemorySeatRepository();
    sut = new GetAvailableSeatsService(inMemoryAvailableRepository);
  });

  it("deve retornar uma lista vazia quando não há assentos disponíveis", async () => {
    const { seats } = await sut.execute({ sessionId: "session-1" });
    expect(seats).toEqual([]);
  });

  it("Deve retornar assentos disponíveis sem reservas", async () => {
    const seat: SeatWithReservation = {
      id: randomUUID(),
      row: "A",
      number: 1,
      sessionId: "session-1",
      Reservation: null,
    };
    inMemoryAvailableRepository.seats.push(seat);
    const { seats } = await sut.execute({ sessionId: "session-1" });
    expect(seats).toHaveLength(1);
    expect(seats[0]).toEqual(seat);
  });

  it("Deve considerar assentos com reservas expiradas como disponíveis", async () => {
    const seat: SeatWithReservation = {
      id: randomUUID(),
      row: "B",
      number: 2,
      sessionId: "sessao-1",
      Reservation: {
        id: randomUUID(),
        userId: "user-1",
        seatId: "qualquer",
        confirmed: false,
        expiresAt: new Date(Date.now() - 1000 * 60),
      },
    };
    inMemoryAvailableRepository.seats.push(seat);

    const { seats } = await sut.execute({ sessionId: "sessao-1" });

    expect(seats).toHaveLength(1);
    expect(seats[0]).toEqual(seat);
  });
  it("não deve retornar assentos com reserva confirmada", async () => {
    const seat: SeatWithReservation = {
      id: randomUUID(),
      row: "C",
      number: 3,
      sessionId: "sessao-1",
      Reservation: {
        id: randomUUID(),
        userId: "user-1",
        seatId: "qualquer",
        confirmed: true,
        expiresAt: new Date(Date.now() + 1000 * 60), // ainda válida
      },
    };
    inMemoryAvailableRepository.seats.push(seat);

    const { seats } = await sut.execute({ sessionId: "sessao-1" });

    expect(seats).toHaveLength(0);
  });
});
