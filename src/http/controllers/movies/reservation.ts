import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidSeatError } from "@/services/errors/seat-invalid";
import { UserNotFoundError } from "@/services/errors/user-not-found";
import { SeatAlreadyReservedError } from "@/services/errors/seat-already-reserved";
import { makeReservationService } from "@/services/factories/make-reservation-service";
import { z } from "zod";

export const reserveSeatBodySchema = z.object({
  sessionId: z.string().uuid(),
  seatId: z.string().uuid(),
});

export async function reserveSeatController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { sessionId, seatId } = reserveSeatBodySchema.parse(req.body);
    const userId = (req as any).user?.sub;
    if (!userId) {
      return res.status(401).send({ message: "Usuário não autenticado" });
    }

    const reserveSeatService = makeReservationService();

    const { reservation } = await reserveSeatService.execute({
      userId,
      sessionId,
      seatId,
    });

    return res.status(201).send(reservation);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof InvalidSeatError) {
      return res.status(400).send({ message: error.message });
    }
    if (error instanceof SeatAlreadyReservedError) {
      return res.status(409).send({ message: error.message });
    }

    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
