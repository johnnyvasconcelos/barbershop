import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const barbershopNames = [
    "Barbearia Corleone",
    "Red Navalha",
    "Barba & Navalha",
    "Lenhador Urbano",
    "Dom Pedro Barbearia",
    "The Shave Club",
    "Barbearia do Zé",
    "Cavalera",
    "Black Beard",
    "Mustache Club",
    "O Garimpeiro",
    "Barbearia Imperial",
    "Barba Ruiva",
    "Navalha de Ouro",
    "Corte Supremo",
    "Estilo Urbano",
    "Barbearia Vintage",
    "Clube da Barba",
    "Alfa Masculino",
    "Barbearia 1950",
    "Vikings Barber",
    "Barba de Respeito",
    "Ponto do Corte",
    "Elite Barber",
    "Saint Germain",
  ];

  const serviceTemplates = [
    {
      name: "Corte de Cabelo",
      price: 45.0,
      description: "Corte tradicional ou moderno utilizando máquina e tesoura.",
    },
    {
      name: "Barba Completa",
      price: 35.0,
      description: "Design de barba com toalha quente e massagem facial.",
    },
    {
      name: "Cabelo + Barba",
      price: 70.0,
      description: "Combo completo para renovar o visual por inteiro.",
    },
    {
      name: "Sobrancelha na Navalha",
      price: 15.0,
      description: "Alinhamento e limpeza da sobrancelha feito com precisão.",
    },
    {
      name: "Acabamento / Pezinho",
      price: 20.0,
      description:
        "Limpeza rápida das laterais e nuca para manter o corte em dia.",
    },
    {
      name: "Penteado + Pomada",
      price: 25.0,
      description:
        "Lavagem profissional e estilização usando produtos premium.",
    },
  ];

  await prisma.booking.deleteMany();
  await prisma.barbershopService.deleteMany();
  await prisma.barbershop.deleteMany();

  for (let i = 0; i < barbershopNames.length; i++) {
    const name = barbershopNames[i];
    const shopIndex = i + 1;

    const barbershop = await prisma.barbershop.create({
      data: {
        name: name,
        description:
          "Referencia em estetica masculina na regiao, oferecendo conforto, atendimento premium e profissionais qualificados.",
        imageUrl:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop",
        phones: ["11 99999-100" + shopIndex, "11 3333-200" + shopIndex],
      },
    });

    for (const service of serviceTemplates) {
      await prisma.barbershopService.create({
        data: {
          name: service.name,
          description: service.description,
          price: service.price,
          imageUrl:
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop",
          barbershopId: barbershop.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
