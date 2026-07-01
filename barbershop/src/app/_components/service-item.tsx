import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
interface ServiceItemProps {
  service: BarbershopService;
}

const serviceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex rounded-xl items-center gap-3 p-3">
        <div className="relative min-h-[110px] min-w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">{service.name}</h3>
          <p className="text-gray-400 text-sm">{service.description}</p>
          <div className="flex items-cente justify-between">
            <p className="font-bold text-sm text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price.toNumber())}
            </p>
            <Button variant="outline" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default serviceItem;
