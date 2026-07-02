interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

import { db } from "../_lib/prisma";
import BarberShopItem from "../_components/barbershop-item";
import Busca from "../_components/Busca";
import Header from "../_components/header";

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xs mt-6 mb-5 font-bold uppercase">
          Resultados para "{searchParams?.search}"
        </h2>
        <Busca />
        <div className="grid mt-6 grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {barbershops.length === 0 && (
          <h3 className="text-bold text-xs mt-5">
            Nenhum resultado encontrado.
          </h3>
        )}
      </div>
    </>
  );
};

export default BarbershopPage;
