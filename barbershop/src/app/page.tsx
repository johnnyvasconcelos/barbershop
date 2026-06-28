import { SearchIcon } from "lucide-react";
import { Input } from "./_components/ui/input";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import Header from "./_components/header";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";

const page = async () => {
  // banco de dados
  const barbershops = await db.barbershop.findMany({});
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, usuário!</h2>
        <p>Terça-feira 3 de maio</p>
        {/* BUSCA */}
        <div className="flex mt-5 flex-row justify-content items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <SearchIcon />
        </div>
        {/* IMAGEM */}
        <div className="relative w-full h-[130px] mt-5">
          <Image
            src="/banner-01.webp"
            alt="agende no barbershop."
            fill
            className="object-contain rounded-xl"
          />
        </div>
        {/* AGENDAMENTO */}

        <h2 className="text-xs font-bold mt-5 text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card className="mt-3">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="rounded-xl w-fit">Confirmado</Badge>
              <h3>Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/user.webp"></AvatarImage>
                </Avatar>
                <p className="text-sm font-semibold">Barbearia do Juvenal</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-5 border-l-2 border-solid border-l-[#212122]">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/* RECOMENDADOS (DB) */}

        <h2 className="text-xs font-bold mt-5 text-gray-400 uppercase">
          Recomendados
        </h2>
        {barbershops.map((barbershop) => {
          return <BarberShopItem key={barbershop.id} barbershop={barbershop} />;
        })}
      </div>
    </>
  );
};

export default page;
