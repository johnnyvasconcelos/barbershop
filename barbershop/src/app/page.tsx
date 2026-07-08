import Header from "./_components/header";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import Busca from "./_components/Busca";
import BuscaRapida from "./_components/BuscaRapida";
import Agendamentos from "./_components/Agendamentos";
import Banner from "./_components/Banner";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth/next";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const page = async () => {
  // banco de dados
  const session = (await getServerSession(authOptions)) || undefined;
  const barbershops = await db.barbershop.findMany({});
  const recommendedBarbershops = await db.barbershop.findMany({
    take: 3,
  });
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
      <div className="relative w-full md:before:absolute md:before:inset-0 md:before:bg-[url('/background.webp')] md:before:bg-cover md:before:bg-center md:before:grayscale md:before:-z-10">
        <div className="px-5 py-5 md:py-12 md:flex w-full max-w-7xl mx-auto gap-8">
          <div className="w-full md:w-2/5">
            <h2 className="text-xl font-bold">
              Olá, {session?.user?.name?.split(" ")[0] ?? "Usuário"}!
            </h2>
            <p>{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</p>
            {/* BUSCA */}
            <Busca />
          </div>

          <div className="hidden md:flex md:flex-col md:w-3/5">
            {/* RECOMENDADOS (DB) */}
            <h2 className="text-xs font-bold mt-6 text-gray-400 uppercase">
              Recomendados
            </h2>
            <div className="flex gap-4 mt-3 overflow-auto [&::-webkit-scrollbar]:hidden">
              {recommendedBarbershops.map((barbershop) => {
                return (
                  <BarberShopItem key={barbershop.id} barbershop={barbershop} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5 max-w-7xl mx-auto md:hidden">
        {/* BUSCA RÁPIDA */}
        <BuscaRapida />

        {/* BANNER */}
        <Banner />
      </div>
      <div className="p-5 max-w-7xl mx-auto">
        {/* AGENDAMENTO */}
        {session && (
          <>
            <h2 className="text-xs font-bold mt-5 text-gray-400 uppercase">
              Agendamentos
            </h2>

            <div className="overflow-auto mt-3 [&::-webkit-scrollbar]:hidden">
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex flex-col">
                {bookings?.map((booking) => (
                  <Agendamentos key={booking.id} booking={booking} />
                ))}
                {bookings?.length === 0 && (
                  <p className="text-gray-400 text-sm mt-4">
                    Nenhum agendamento encontrado.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

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
