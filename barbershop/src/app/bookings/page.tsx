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
  });
  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="font-bold text-xl">Agendamentos</h1>
        <div className="mt-5">
          {bookings?.map((booking) => (
            <Agendamento key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
