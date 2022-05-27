import Stripe from "stripe";
import { buffer } from "micro";
import { supabase } from "../../utils/supabaseClient";
export const config = {
  api: {
    bodyParser: false,
  },
};
const endpointSecret = "whsec_EdVORXGfF4eL6vfRl85JDgt4hY9fO0PP";

const stripe = new Stripe(endpointSecret);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const buf = await buffer(req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // user has successfully paid for a plan and need to update supabase now
    // problem: stripe webhook doesn't show us what product was purchased so need to go off of amount subtotal
    const stripeCustomerID = event.data.object.customer;
    const amountSubtotal = event.data.object.amount_subtotal;
    let planName;

    switch (true) {
      case amountSubtotal >= 1499:
        planName = "Platinum";
        break;
      case amountSubtotal > 499 && amountSubtotal <= 999:
        planName = "Gold";
        break;
      case amountSubtotal <= 499:
        planName = "Bronze";
        break;
    }

    const { data } = await supabase
      .from("profile")
      .update({ plan_name: planName })
      
      .eq("stripe_customer", stripeCustomerID);

    await supabase.rpc('append_plans', { new_element: planName, stripe_customer_id: stripeCustomerID})

    await supabase.rpc('increment_total_paid_amount', { stripe_customer_id: stripeCustomerID, amt_paid: amountSubtotal})

    res.send(data);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
