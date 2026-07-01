import { db } from "@/app/_lib/prisma";
import { Button } from "../../_components/ui/button";
import Image from "next/image";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
const page = async ({ params }: { params: { id: string } }) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <>
      {/* IMAGEM */}
      <div className="relative w-full h-[250px]">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button size="icon" className="absolute top-4 left-4" asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button size="icon" className="absolute top-4 right-4" asChild>
          <MenuIcon />
        </Button>
      </div>
      {/* TÍTULO */}
      <div className="p-5 border-b border-solid">
        <h1 className="font-bold text-xl mb-4">{barbershop?.name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="primary fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (940 avaliações)</p>
        </div>
      </div>
      {/* DESCRIÇÃO */}
      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="uppercase font-bold text-xs text-gray-400">sobre nós</h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>
    </>
  );
};

export default page;
