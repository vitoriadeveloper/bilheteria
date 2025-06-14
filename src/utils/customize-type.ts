import { Movie, Session, Seat } from "@prisma/client";

export type MovieWithSessionsAndSeats = Movie & {
  Session: (Session & {
    seats: Seat[];
  })[];
};


export type SeatWithReservation = Seat & {
  Reservation: {
    id: string;
    userId: string;
    seatId: string;
    expiresAt: Date;
    confirmed: boolean;
  } | null;
};