import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card>
      <CardContent>
        <div className="relative h-[159px]">
          <Image
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
