import { SearchIcon } from "lucide-react";
import { Input } from "./_components/ui/input";
import Header from "./_components/header";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, usuário!</h2>
        <p>Terça-feira 3 de maio</p>
        <div className="flex mt-5 flex-row justify-content items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <SearchIcon />
        </div>
        <div className="relative w-full h-[130px] mt-5">
          <Image
            src="/banner-01.webp"
            alt="agende no barbershop."
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

export default page;
