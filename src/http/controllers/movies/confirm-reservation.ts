import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ReservationNotFoundError } from "@/services/errors/reservation-not-found";
import { AccessDeniedError } from "@/services/errors/access-denied";
import { ReservationAlreadyConfirmed } from "@/services/errors/reservation-already-confirmed";
import { ReservationExpiredError } from "@/services/errors/reservation-expired";
import { makeConfirmReservationService } from "@/services/factories/make-confirm-reservation-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";

export const confirmReserveSeatBodySchema = z.object({
  reservationId: z.string().uuid(),
});

export async function confirmReservationSeatController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { reservationId } = confirmReserveSeatBodySchema.parse(req.body);
    const userId = (req as any).user?.sub;
    if (!userId) {
      throw new InvalidCredentialsError();
    }

    const confirmReservationSeatService = makeConfirmReservationService();

    await confirmReservationSeatService.execute({
      userId,
      reservationId,
    });

    return res.status(200).send({ message: "Reserva confirmada com sucesso!" });
  } catch (error) {
    if (error instanceof ReservationNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof AccessDeniedError) {
      return res.status(403).send({ message: error.message });
    }
    if (error instanceof ReservationAlreadyConfirmed) {
      return res.status(409).send({ message: error.message });
    }

    if (error instanceof ReservationExpiredError) {
      return res.status(410).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
