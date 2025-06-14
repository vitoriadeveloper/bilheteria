import { Seat } from "@prisma/client";

export interface SeatsRepository {
  findById(id: string): Promise<(Seat & { Reservation: any }) | null>;
}