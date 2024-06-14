import { convertedUrl } from "@/lib/database";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(request) {
  try {
    const { artPiece } = await request.json();
    // console.log(artPiece);

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: artPiece.title,
              description: artPiece.description,
            },
            unit_amount: artPiece.price * 100, // price in cents
          },

          quantity: 1,
        },
      ],
      metadata: {
        title: artPiece.title,
        medium: artPiece.medium,
        description: artPiece.description,
        gallery: artPiece.gallery,
        city: artPiece.city,
        country: artPiece.country,
        price: artPiece.price,
        title: artPiece.title,
        artistId: artPiece.artist.id,
        artistName: artPiece.artist.name,
        artistEmail: artPiece.artist.email,
      },
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/payment-success?session_id={CHECKOUT_SESSION_ID}&title=${
        artPiece.title
      }`,
      cancel_url: convertedUrl(
        `${request.headers.get("origin")}/arts/${artPiece.title}`
      ),
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
