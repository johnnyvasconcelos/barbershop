import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { notFound } from "next/navigation";
import Agendamento from "../_components/Agendamentos";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return notFound();
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const agora = new Date();

  const confirmados = bookings.filter((booking) => {
    return new Date(booking.date) >= agora;
  });

  const finalizados = bookings.filter((booking) => {
    return new Date(booking.date) < agora;
  });

  return (
    <>
      <Header />
      <div className="p-5 space-y-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>
        <div>
          <h2 className="text-gray-400 uppercase font-bold text-xs mb-3">
            Confirmados
          </h2>
          {confirmados.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {confirmados.map((booking) => (
                <Agendamento key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Nenhum agendamento confirmado no momento.
            </p>
          )}
        </div>

        {finalizados.length > 0 && (
          <div>
            <h2 className="text-gray-400 uppercase font-bold text-xs mb-3">
              Finalizados
            </h2>
            <div className="flex flex-col space-y-3">
              {finalizados.map((booking) => (
                <Agendamento key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        {bookings.length === 0 && (
          <p className="text-gray-400 text-sm">
            Você ainda não realizou nenhum agendamento.
          </p>
        )}
      </div>
    </>
  );
};

export default Bookings;
