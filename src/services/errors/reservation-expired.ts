export class ReservationExpiredError extends Error {
  constructor() {
    super("Reservada expirada!");
  }
}
