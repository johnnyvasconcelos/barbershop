"use client";

import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { set } from "date-fns/set";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

import { format } from "date-fns/format";
import { createBooking } from "../_actions/create-booking";

const serviceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelected = (time: string | undefined) => {
    setSelectedTime(time);
  };

  const TIME_LIST = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const handleCreateBooking = async () => {
    if (!selectedDay || !selectedTime || !data?.user) {
      return;
    }

    const hour = Number(selectedTime.split(":")[0]);
    const minute = Number(selectedTime.split(":")[1]);

    const newDate = set(selectedDay, {
      hours: hour,
      minutes: minute,
    });

    await createBooking({
      serviceId: service.id ?? "",
      userId: (data?.user as any).id,
      date: newDate,
    });
  };
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
              <SheetContent className="bg-background border-b border-solid">
                <SheetHeader className="border-b border-solid">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="p-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDaySelect}
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
                  {selectedDay && (
                    <div className="border-b border-solid p-4 mt-3 gap-3 overflow-x-auto flex [&::-webkit-scrollbar]:hidden">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelected(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-gray-400 text-sm">Data</h2>
                            <p className="text-sm font-bold">
                              {selectedDay
                                ? format(selectedDay, "d 'de' MMMM", {
                                    locale: ptBR,
                                  })
                                : ""}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-gray-400 text-sm">Horário</h2>
                            <p className="text-sm font-bold">{selectedTime}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-gray-400 text-sm">Barbearia</h2>
                            <p className="text-sm font-bold">
                              {barbershop.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {selectedDay && selectedTime && (
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Salvar</Button>
                      </SheetClose>
                    </SheetFooter>
                  )}
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
