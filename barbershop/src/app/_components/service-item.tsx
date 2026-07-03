"use client";

import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
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
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-md" variant="outline" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background">
                <SheetHeader className="border-b border-solid">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    className="w-full"
                    classNames={{
                      months: "w-full space-y-4",
                      month: "w-full space-y-4",
                      month_caption:
                        "w-full flex justify-center items-center py-2 relative min-h-[36px]",
                      caption_label: "text-sm font-medium capitalize",
                      nav: "absolute left-0 right-0 flex justify-between items-center z-10 px-1 pointer-events-none",
                      button_previous:
                        "h-7 w-7 bg-transparent p-0 text-muted-foreground hover:opacity-100 pointer-events-auto",
                      button_next:
                        "h-7 w-7 bg-transparent p-0 text-muted-foreground hover:opacity-100 pointer-events-auto",
                      month_grid: "w-full border-collapse space-y-1",
                      week: "flex w-full mt-2 justify-between",
                      weekday:
                        "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] capitalize text-center",
                      day: "w-full p-0 relative text-center text-sm flex items-center justify-center",
                      day_button:
                        "w-full h-9 flex items-center justify-center p-0 font-normal aria-selected:opacity-100",
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default serviceItem;
