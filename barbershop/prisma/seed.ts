import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const barbershopsData = [
    {
      name: "Barbearia Corleone",
      address: "Rua Augusta, 456 - Consolação, São Paulo - SP",
    },
    {
      name: "Red Navalha",
      address: "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
    },
    {
      name: "Barba & Navalha",
      address: "Rua dos Pinheiros, 789 - Pinheiros, São Paulo - SP",
    },
    {
      name: "Lenhador Urbano",
      address: "Rua Pamplona, 321 - Jardim Paulista, São Paulo - SP",
    },
    {
      name: "Dom Pedro Barbearia",
      address: "Alameda Lorena, 150 - Jardins, São Paulo - SP",
    },
    {
      name: "The Shave Club",
      address: "Av. Brigadeiro Faria Lima, 2200 - Itaim Bibi, São Paulo - SP",
    },
    {
      name: "Barbearia do Zé",
      address: "Rua Vergueiro, 987 - Vila Mariana, São Paulo - SP",
    },
    {
      name: "Cavalera",
      address: "Rua Purpurina, 400 - Vila Madalena, São Paulo - SP",
    },
    {
      name: "Black Beard",
      address: "Av. Rebouças, 3400 - Pinheiros, São Paulo - SP",
    },
    {
      name: "Mustache Club",
      address: "Rua Domingos de Morais, 120 - Vila Mariana, São Paulo - SP",
    },
    {
      name: "O Garimpeiro",
      address: "Rua João Cachoeira, 550 - Itaim Bibi, São Paulo - SP",
    },
    {
      name: "Barbearia Imperial",
      address: "Av. Ibirapuera, 2300 - Moema, São Paulo - SP",
    },
    { name: "Barba Ruiva", address: "Rua Clélia, 880 - Lapa, São Paulo - SP" },
    {
      name: "Navalha de Ouro",
      address: "Rua Turiassu, 430 - Perdizes, São Paulo - SP",
    },
    {
      name: "Corte Supremo",
      address: "Av. Cruzeiro do Sul, 1100 - Santana, São Paulo - SP",
    },
    {
      name: "Estilo Urbano",
      address: "Rua Juventus, 320 - Mooca, São Paulo - SP",
    },
    {
      name: "Barbearia Vintage",
      address: "Rua Dr. Zuquim, 450 - Santana, São Paulo - SP",
    },
    {
      name: "Clube da Barba",
      address:
        "Av. Engenheiro Caetano Álvares, 2500 - Mandaqui, São Paulo - SP",
    },
    {
      name: "Alfa Masculino",
      address: "Rua Voluntários da Pátria, 1800 - Santana, São Paulo - SP",
    },
    {
      name: "Barbearia 1950",
      address: "Av. Braz Leme, 1200 - Santana, São Paulo - SP",
    },
    {
      name: "Vikings Barber",
      address:
        "Rua Conselheiro Moreira de Barros, 900 - Lauzane Paulista, São Paulo - SP",
    },
    {
      name: "Barba de Respeito",
      address: "Alameda Afonso Schmidt, 200 - Santa Teresinha, São Paulo - SP",
    },
    {
      name: "Ponto do Corte",
      address: "Rua Alfredo Pujol, 600 - Santana, São Paulo - SP",
    },
    {
      name: "Elite Barber",
      address: "Rua Pedro Doll, 150 - Santana, São Paulo - SP",
    },
    {
      name: "Saint Germain",
      address: "Rua Francisca Júlia, 300 - Santana, São Paulo - SP",
    },
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

  const barbershopImages = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596728325488-58c87691e9af?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop",
  ];

  await prisma.booking.deleteMany();
  await prisma.barbershopService.deleteMany();
  await prisma.barbershop.deleteMany();

  for (let i = 0; i < barbershopsData.length; i++) {
    const shop = barbershopsData[i];
    const shopIndex = i + 1;
    const chosenImageUrl = barbershopImages[i % barbershopImages.length];

    const barbershop = await prisma.barbershop.create({
      data: {
        name: shop.name,
        address: shop.address,
        description:
          "Referencia em estetica masculina na regiao, oferecendo conforto, atendimento premium e profissionais qualificados.",
        imageUrl: chosenImageUrl,
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
