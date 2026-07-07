"use server";

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBooking = async (bookingId: string) => {
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    revalidatePath("/bookings");
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    throw new Error("Não foi possível cancelar o agendamento.");
  }
};
