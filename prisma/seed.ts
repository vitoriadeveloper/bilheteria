import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Criar filmes
  await prisma.movie.createMany({
    data: [
      {
        title: 'Oppenheimer',
        description: 'A história do criador da bomba atômica.',
        duration: 180,
      },
      {
        title: 'Barbie',
        description: 'Barbie embarca em uma aventura no mundo real.',
        duration: 114,
      },
      {
        title: 'Duna: Parte Dois',
        description: 'A continuação da saga de Paul Atreides.',
        duration: 150,
      },
    ],
  });

  const allMovies = await prisma.movie.findMany();

  // 2. Criar sessões + assentos para cada filme
  for (const movie of allMovies) {
    const sessions = await prisma.session.createMany({
      data: [
        {
          movieId: movie.id,
          datetime: new Date(Date.now() + 1000 * 60 * 60 * 24), // +1 dia
        },
        {
          movieId: movie.id,
          datetime: new Date(Date.now() + 1000 * 60 * 60 * 48), // +2 dias
        },
      ],
    });

    // Buscar sessões criadas para esse filme
    const createdSessions = await prisma.session.findMany({
      where: {
        movieId: movie.id,
      },
    });

    // 3. Criar assentos: 3 fileiras (A, B, C), 5 assentos cada
    const rows = ['A', 'B', 'C'];
    const seatCountPerRow = 5;

    for (const session of createdSessions) {
      const seatsData = [];

      for (const row of rows) {
        for (let i = 1; i <= seatCountPerRow; i++) {
          seatsData.push({
            row,
            number: i,
            sessionId: session.id,
          });
        }
      }

      await prisma.seat.createMany({ data: seatsData });
    }
  }

  console.log('✅ Banco populado com filmes, sessões e assentos!');
}

main()
  .catch((e) => {
    console.error('Erro ao rodar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
