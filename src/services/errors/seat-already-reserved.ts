export class SeatAlreadyReservedError extends Error {
  constructor() {
    super("Assento já reservado");
  }
}
