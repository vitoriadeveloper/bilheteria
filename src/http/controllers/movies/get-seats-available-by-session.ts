import { FastifyReply, FastifyRequest } from "fastify";
import { MoviesNotFoundError } from "@/services/errors/movies-not-found";
import { makeGetAvailableSeatsService } from "@/services/factories/make-get-available-seats-service";
import z from "zod";

const paramsSchema = z.object({
  sessionId: z.string().uuid(),
});
export async function getSeatsAvailableBySession(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { sessionId } = paramsSchema.parse(req.params);
    const getSeatsAvailableService = makeGetAvailableSeatsService();
    const { seats } = await getSeatsAvailableService.execute({ sessionId });

    return res.status(200).send(seats);
  } catch (err) {
    if (err instanceof MoviesNotFoundError) {
      return res.status(404).send({ message: err.message });
    }
    return res.status(500).send();
  }
}
