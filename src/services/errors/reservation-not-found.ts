export class ReservationNotFoundError extends Error {
    constructor(){
        super('Reserva não encontrada')
    }
}