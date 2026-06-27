import { SearchIcon } from "lucide-react";
import { Input } from "./_components/ui/input";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import Header from "./_components/header";
import Image from "next/image";

const page = () => {
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
        <Card className="mt-5">
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
      </div>
    </>
  );
};

export default page;
