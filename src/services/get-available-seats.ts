import { SeatsRepository } from "@/repository/seats-repository";

interface GetAvailableSeatsRequest {
  sessionId: string;
}

export class GetAvailableSeatsService {
  constructor(private readonly seatsRepository: SeatsRepository) {}

  async execute({ sessionId }: GetAvailableSeatsRequest) {
    const seats = await this.seatsRepository.findAvailableSeatsBySession(
      sessionId
    );
    return {
      seats,
    };
  }
}
