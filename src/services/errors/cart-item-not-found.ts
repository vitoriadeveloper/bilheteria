export class CartItemNotFoundError extends Error {
  constructor() {
    super("Item do carrinho não encontrado");
  }
}
