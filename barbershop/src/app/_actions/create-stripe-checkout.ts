"use server";

import Stripe from "stripe";

export const createStripeCheckout = async (
  serviceName: string,
  servicePrice: number,
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://barbershop-tau-two.vercel.app/bookings",
    cancel_url: "https://barbershop-tau-two.vercel.app",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: serviceName,
          },
          unit_amount: Math.round(servicePrice * 100),
        },
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id, url: session.url };
};
