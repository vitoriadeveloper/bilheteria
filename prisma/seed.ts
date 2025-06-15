import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Criar filmes
  await prisma.movie.createMany({
    data: [
      {
        title: "Oppenheimer",
        description: "A história do criador da bomba atômica.",
        duration: 180,
        price: 27.88,
      },
      {
        title: "Barbie",
        description: "Barbie embarca em uma aventura no mundo real.",
        duration: 114,
        price: 22.88,
      },
      {
        title: "Duna: Parte Dois",
        description: "A continuação da saga de Paul Atreides.",
        duration: 150,
        price: 24.88,
      },
    ],
  });

  const allMovies = await prisma.movie.findMany();
  // 2. Criar produtos adicionais
  await prisma.product.createMany({
    data: [
      {
        name: "Pipoca Média",
        price: 15.0,
        quantity: 100
      },
      {
        name: "Pipoca Grande",
        price: 20.0,
        quantity: 100
      },
      {
        name: "Refrigerante 500ml",
        price: 10.0,
        quantity: 100
      },
      {
        name: "Chocolate",
        price: 8.0,
        quantity: 100
      },
      {
        name: "Água",
        price: 5.0,
        quantity: 100
      },
      {
        name: "Fini Tubo",
        price: 8.0,
        quantity: 100
      },
    ],
  });
  // 3. Criar sessões + assentos para cada filme
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

    // 4. Criar assentos: 3 fileiras (A, B, C), 5 assentos cada
    const rows = ["A", "B", "C"];
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

  console.log("✅ Banco populado com filmes, sessões e assentos!");
}

main()
  .catch((e) => {
    console.error("Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
