import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { isFuture } from "date-fns/isFuture";
// import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
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
  const isConfirmed = isFuture(booking.date);
  return (
    <>
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
    </>
  );
};

export default Agendamentos;
