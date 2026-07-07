"use client";

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import CardDetails from "./CardDetails";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { set } from "date-fns/set";
import { signIn, signOut } from "next-auth/react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { SignInDialog } from "./sign-in-dialog";
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
import { getBooking } from "../_actions/get-booking";
import { addDays } from "date-fns/addDays";
import { toast } from "sonner";

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

  const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0]);
      const minutes = Number(time.split(":")[1]);
      if (
        bookings.some(
          (booking) =>
            booking.date.getHours() === hour &&
            booking.date.getMinutes() === minutes,
        )
      ) {
        return false;
      }
      return true;
    });
  };

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!selectedDay) {
      return;
    }
    const fetch = async () => {
      const bookings = await getBooking({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay]);

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

    toast.success("Agendado realizado com sucesso!", {
      description: "Agendamento realizado com sucesso.",
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
                <Button className="rounded-md" variant="default" size="xs">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="bg-background border-b border-solid">
                {data?.user ? (
                  <>
                    <SheetHeader className="border-b border-solid">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={selectedDay}
                        onSelect={handleDaySelect}
                        className="rounded-md w-full border mx-auto"
                      />
                      {selectedDay && (
                        <div className="border-b border-solid p-4 mt-3 gap-3 overflow-x-auto flex [&::-webkit-scrollbar]:hidden">
                          {getTimeList(dayBookings).map((time) => (
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
                        <div className="p-4">
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
                                <h2 className="text-gray-400 text-sm">
                                  Horário
                                </h2>
                                <p className="text-sm font-bold">
                                  {selectedTime}
                                </p>
                              </div>

                              <div className="flex justify-between items-center">
                                <h2 className="text-gray-400 text-sm">
                                  Barbearia
                                </h2>
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
                            <Button type="submit" onClick={handleCreateBooking}>
                              Agendar
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center h-full gap-4 px-4">
                    <SheetHeader>
                      <SheetTitle className="text-center text-xl">
                        Faça login para continuar
                      </SheetTitle>
                    </SheetHeader>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="gap-2 font-bold w-full py-6 mt-2"
                        >
                          <Image
                            alt="google icon svg"
                            width={18}
                            height={18}
                            src="/google.svg"
                          />
                          Conectar com o Google
                        </Button>
                      </DialogTrigger>

                      <SignInDialog />
                    </Dialog>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default serviceItem;
