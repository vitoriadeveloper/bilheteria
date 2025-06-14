export class MoviesNotFound extends Error {
    constructor(){
        super('Sem filmes no momento...')
    }
}