import { db } from "@/app/_lib/prisma";

const page = async ({ params }: { params: { id: string } }) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    return <h1>Barbearia não encontrada</h1>;
  }

  return <h1>{barbershop.name}</h1>;
};

export default page;
