import Header from "./_components/header";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { Scissors, Wand2, Sparkles, Smile, Eye } from "lucide-react";

import Busca from "./_components/Busca";
import BuscaRapida from "./_components/BuscaRapida";
import Agendamentos from "./_components/Agendamentos";
import Banner from "./_components/Banner";
import Footer from "./_components/Footer";

const page = async () => {
  // banco de dados
  const barbershops = await db.barbershop.findMany({});
  const popularBank = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  // categorias da barbearia
  interface QuickSearchOption {
    imageUrl: string;
    title: string;
  }

  const quickSearchOptions: QuickSearchOption[] = [
    { imageUrl: "cabelo", title: "Cabelo" },
    { imageUrl: "barba", title: "Barba" },
    { imageUrl: "bigode", title: "Bigode" },
    { imageUrl: "massagem", title: "Massagem" },
    { imageUrl: "sobrancelha", title: "Sobrancelha" },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cabelo":
        return <Scissors size={14} />;
      case "barba":
        return <Wand2 size={14} />;
      case "bigode":
        return <Sparkles size={14} />;
      case "massagem":
        return <Smile size={14} />;
      case "sobrancelha":
        return <Eye size={14} />;
      default:
        return <Scissors size={14} />;
    }
  };
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, usuário!</h2>
        <p>Terça-feira 3 de maio</p>
        {/* BUSCA */}
        <Busca />

        {/* BUSCA RÁPIDA */}
        <BuscaRapida quickSearchOptions={quickSearchOptions} />

        {/* BANNER */}
        <Banner />

        {/* AGENDAMENTO */}
        <h2 className="text-xs font-bold mt-5 text-gray-400 uppercase">
          Agendamentos
        </h2>
        <Agendamentos />

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
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default page;
