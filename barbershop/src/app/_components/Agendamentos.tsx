import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { isFuture } from "date-fns/isFuture";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { SheetContent, SheetHeader, SheetTitle } from "../_components/ui/sheet";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ButtonClick from "./ButtonClick";
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: {
            include: {
              phones: true;
            };
          };
        };
      };
    };
  }>;
}
const bookings = await db.booking.findMany({
  include: {
    service: {
      include: {
        barbershop: {
          include: {
            phones: true, // Garante que o banco de dados vai retornar a lista de telefones
          },
        },
      },
    },
  },
});
onst Agendamentos = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);
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
                  {isConfirmed ? "Confirmado" : "Pendente"}
                </Badge>
                <h3>{booking.service.name}</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={booking.service.barbershop.imageUrl}
                    ></AvatarImage>
                  </Avatar>
                  <p className="text-sm font-semibold">
                    {booking.service.barbershop.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center px-5 border-l-2 border-solid border-l-[#212122]">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {" "}
                  {format(booking.date, "HH:mm", { locale: ptBR })}
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
              alt={`mapa da barbearia ${booking.service.barbershop.name}`}
              src="/map.webp"
              fill
              className="object-cover"
            />

            <Card className="z-50 w-full mb-3 mx-5">
              <CardContent className="flex gap-2 items-start px-3 py-4">
                <Avatar>
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">
                    {booking.service.barbershop.name}
                  </h3>
                  <p className="text-xs text-color-gray-400">
                    {booking.service.barbershop.address}
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
              {isConfirmed ? "Confirmado" : "Pendente"}
            </Badge>

            <Card className="mt-4">
              <CardContent className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <p className="text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Data</h2>
                  <p className="text-sm font-bold">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Horário</h2>
                  <p className="text-sm font-bold">
                    {format(booking.date, "HH:mm")}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-gray-400 text-sm">Barbearia</h2>
                  <p className="text-sm font-bold">
                    {booking.service.barbershop.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-col gap-3">
              {booking.service.barbershop.phones.map((phone) => (
                <ButtonClick key={phone} phone={phone} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Agendamentos;
