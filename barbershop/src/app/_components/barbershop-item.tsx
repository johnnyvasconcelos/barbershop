import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-2">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="object-cover rounded-2xl"
          />

          <Badge className="absolute left-3 top-3 rounded-lg space-x-1">
            <StarIcon className="h-[12px] w-[12px] text-white" />{" "}
            <p className="text-xs text-white">5.0</p>
          </Badge>
        </div>
        <div className="py-3">
          <h3 className="font-semibold text-ellipsis overflow-hidden text-nowrap">
            {barbershop.name}
          </h3>
          <p className="text-sm truncate text-gray-400">{barbershop.address}</p>
          <Button variant="outline" className="w-full mt-3">
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
