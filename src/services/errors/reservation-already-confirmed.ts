export class ReservationAlreadyConfirmed extends Error {
  constructor() {
    super("Reserva já confirmada");
  }
}
