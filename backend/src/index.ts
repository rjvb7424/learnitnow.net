
import { setGlobalOptions } from "firebase-functions/v2"; // For setGlobalOptions directly
import { onRequest } from "firebase-functions/v2/https"; // For HTTP functions
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error("Stripe secret key not found in environment variables");
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2023-08-16",
});
