import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteReservationService } from "@/services/factories/make-delete-reservation-service";
import { ReservationNotFoundError } from "@/services/errors/reservation-not-found";
import { ReservationAlreadyConfirmed } from "@/services/errors/reservation-already-confirmed";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";

export const deleteReserveSeatBodySchema = z.object({
  reservationId: z.string().uuid(),
});

export async function deleteReservationSeatController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { reservationId } = deleteReserveSeatBodySchema.parse(req.body);
    const userId = (req as any).user?.sub;
    if (!userId) {
      throw new InvalidCredentialsError();
    }

    const deleteReservationSeatService = makeDeleteReservationService();

    await deleteReservationSeatService.execute({
      reservationId,
    });

    return res.status(200).send({ message: "Reserva cancelada com sucesso!" });
  } catch (error) {
    if (error instanceof ReservationNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof ReservationAlreadyConfirmed) {
      return res.status(409).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
