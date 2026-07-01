import { db } from "@/app/_lib/prisma";
import { Button } from "../../_components/ui/button";
import MenuMobile from "@/app/_components/MenuMobile";
import ButtonClick from "@/app/_components/ButtonClick";
import Image from "next/image";
import {
  ChevronLeftIcon,
  MenuIcon,
  MapPinIcon,
  StarIcon,
  SmartphoneIcon,
  Scissors,
  Wand2,
  Sparkles,
  Smile,
  Eye,
} from "lucide-react";
import Link from "next/link";
import ServiceItem from "../../_components/service-item";
import { notFound } from "next/navigation";
const page = async ({ params }: { params: { id: string } }) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

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
          <MenuMobile
            getIcon={getIcon}
            quickSearchOptions={quickSearchOptions}
          />
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
      {/* SERVIÇOS */}
      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="uppercase font-bold text-xs text-gray-400 mb-3">
          serviços
        </h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
      {/* CONTATO */}
      <div className="p-5 mt-4 space-y-3">
        <h2 className="uppercase font-bold text-xs text-gray-400 mb-3">
          contato
        </h2>
        {barbershop?.phones.map((phone) => (
          <div className="flex justify-between" key={phone}>
            <div className="flex gap-2 items-center">
              <SmartphoneIcon />
              <p className="text-sm">{phone}</p>
            </div>
            <ButtonClick phone={phone} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
