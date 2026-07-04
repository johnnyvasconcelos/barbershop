import Header from "./_components/header";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import Busca from "./_components/Busca";
import BuscaRapida from "./_components/BuscaRapida";
import Agendamentos from "./_components/Agendamentos";
import Banner from "./_components/Banner";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const page = async () => {
  // banco de dados
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any)?.id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : [];
  const popularBank = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, usuário!</h2>
        <p>Terça-feira 3 de maio</p>
        {/* BUSCA */}
        <Busca />

        {/* BUSCA RÁPIDA */}
        <BuscaRapida />

        {/* BANNER */}
        <Banner />

        {/* AGENDAMENTO */}
        <h2 className="text-xs font-bold mt-5 text-gray-400 uppercase">
          Agendamentos
        </h2>

        <div className="flex flex-col space-y-3">
          {bookings?.map((booking) => (
            <Agendamentos key={booking.id} booking={booking} />
          ))}
        </div>

        {/* RECOMENDADOS (DB) */}
        <h2 className="text-xs font-bold mt-6 text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 mt-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>

        <h2 className="text-xs font-bold mt-6 text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-4 mt-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBank.map((barbershop) => {
            return (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
