export class MoviesNotFoundError extends Error {
    constructor(){
        super('Sem filmes no momento...')
    }
}