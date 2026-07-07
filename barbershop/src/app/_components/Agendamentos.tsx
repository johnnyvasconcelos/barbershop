"use client";

import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { isFuture } from "date-fns/isFuture";
import { Sheet, SheetClose, SheetTrigger } from "../_components/ui/sheet";
import { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../_components/ui/sheet";
import { SmartphoneIcon } from "lucide-react";
import { SheetFooter } from "../_components/ui/sheet";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import ButtonClick from "./ButtonClick";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteBooking } from "../_actions/delete-booking";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const Agendamentos = ({ booking }: BookingItemProps) => {
  const serializedBooking = {
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const isConfirmed = isFuture(serializedBooking.date);

  const handleCancelBookingClick = async () => {
    setIsDeleting(true);
    try {
      await deleteBooking(booking.id);
      toast.success("Agendamento removido com sucesso!", {
        description: "Agende novamente quando quiser.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover agendamento.", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full" asChild>
          <Card className="mt-3">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="rounded-xl w-fit"
                  variant={isConfirmed ? "default" : "outline"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3>{serializedBooking.service.name}</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={serializedBooking.service.barbershop.imageUrl}
                    />
                  </Avatar>
                  <p className="text-sm font-semibold">
                    {serializedBooking.service.barbershop.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-5 border-l-2 border-solid border-l-[#212122]">
                <p className="text-sm capitalize">
                  {format(serializedBooking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(serializedBooking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(serializedBooking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className="bg-background">
          <SheetHeader>
            <SheetTitle>Informações da reserva</SheetTitle>
          </SheetHeader>
          <div className="relative h-[180px] mx-auto w-[90%] rounded-lg overflow-hidden flex items-end">
            <Image
              alt={`mapa da barbearia ${serializedBooking.service.barbershop.name}`}
              src="/map.webp"
              fill
              className="object-cover"
            />

            <Card className="z-50 w-full mb-3 mx-5">
              <CardContent className="flex gap-2 items-start px-3 py-4">
                <Avatar>
                  <AvatarImage
                    src={serializedBooking.service.barbershop.imageUrl}
                  />
                </Avatar>
                <div>
                  <h3 className="font-bold">
                    {serializedBooking.service.barbershop.name}
                  </h3>
                  <p className="text-xs text-color-gray-400">
                    {serializedBooking.service.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 mx-auto w-[90%]">
            <Badge
              className="rounded-xl w-fit"
              variant={isConfirmed ? "default" : "outline"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <Card className="mt-4">
              <CardContent className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold">
                    {serializedBooking.service.name}
                  </h2>
                  <p className="text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(serializedBooking.service.price))}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Data</h2>
                  <p className="text-sm font-bold">
                    {format(serializedBooking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Horário</h2>
                  <p className="text-sm font-bold">
                    {format(serializedBooking.date, "HH:mm")}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Barbearia</h2>
                  <p className="text-sm font-bold">
                    {serializedBooking.service.barbershop.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-col gap-2">
              {serializedBooking.service.barbershop.phones.map((phone) => (
                <div
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  key={phone}
                >
                  <div className="text-muted-foreground flex-shrink-0">
                    <SmartphoneIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <ButtonClick phone={phone} />
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter className="mt-4">
              <div className="flex justify-between w-full gap-3 mt-4">
                <SheetClose asChild>
                  <Button variant="outline" className="flex-1">
                    Voltar
                  </Button>
                </SheetClose>
                {isConfirmed && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex-1 bg-red-500"
                      >
                        Cancelar reserva
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-background">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar Reserva?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja cancelar a reserva? Esta ação
                          não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                        <AlertDialogAction
                          variant="secondary"
                          className="bg-red-500"
                          onClick={handleCancelBookingClick}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Cancelando..." : "Confirmar"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Agendamentos;
