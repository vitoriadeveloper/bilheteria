import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "@/repository/prisma-users-repository";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = registerBodySchema.parse(req.body);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUsersService = new RegisterService(prismaUsersRepository);
    await registerUsersService.execute({ email, password });
  } catch (err: any) {
    return res.status(409).send({
      body: err.message,
    });
  }
  return res.status(201).send();
}
