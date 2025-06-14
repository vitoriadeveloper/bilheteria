import { PrismaReservationRepository } from '@/repository/prisma/prisma-reservation-repository';
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository';
import { ReserveSeatService } from '../reservation-seat';
import { PrismaSeatsRepository } from '@/repository/prisma/prisma-seats-repository';

export function makeReservationService() {
  const reservationsRepository = new PrismaReservationRepository();
  const seatsRepository = new PrismaSeatsRepository();
  const usersRepository = new PrismaUsersRepository();

  const reserveSeatService = new ReserveSeatService(
    reservationsRepository,
    seatsRepository,
    usersRepository
  );

  return reserveSeatService;
}
