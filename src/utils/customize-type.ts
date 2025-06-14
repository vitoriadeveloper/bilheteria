import { Movie, Session, Seat } from "@prisma/client";

export type MovieWithSessionsAndSeats = Movie & {
  Session: (Session & {
    seats: Seat[];
  })[];
};