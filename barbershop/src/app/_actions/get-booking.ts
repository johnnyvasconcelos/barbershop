"use server";

import { endOfDay } from "date-fns/endOfDay";
import { db } from "../_lib/prisma";
import { startOfDay } from "date-fns/startOfDay";

interface GetBookingProps {
  serviceId: string;
  date: Date;
}

export const getBooking = async ({ date }: GetBookingProps) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
};
