import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

interface CardDetailsProps {

const CardDetails = () => {
  return (
    <>
      {" "}
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
            <p className="text-sm font-bold">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardDetails;
