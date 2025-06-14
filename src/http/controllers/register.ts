import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = registerBodySchema.parse(req.body);
  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUsersService = new RegisterService(usersRepository);
    await registerUsersService.execute({ email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(201).send({message: err.message});
    }
    return res.status(500).send();
  }
}
