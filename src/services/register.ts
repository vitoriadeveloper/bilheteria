import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
  email: string;
  password: string;
}
export async function registerService({
  email,
  password,
}: RegisterServiceRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (userWithSameEmail) {
    throw new Error("Email já existe")
  }
  const passwordHash = await hash(password, 6);
  await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
}
