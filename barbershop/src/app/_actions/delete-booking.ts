"use server";

import path from "path";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
  revalidatePath("/bookings");
};
