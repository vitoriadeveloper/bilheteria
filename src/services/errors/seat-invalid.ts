export class InvalidSeatError extends Error {
  constructor() {
    super("Assento inválido para a sessão");
  }
}
