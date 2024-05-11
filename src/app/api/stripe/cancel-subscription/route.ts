import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customerId } = await req.json();
  if (!customerId)
    return new NextResponse("Customer Id is missing", {
      status: 400,
    });

  const subscriptionExists = await db.agency.findFirst({
    where: { customerId },
    include: { Subscription: true },
  });

  try {
    if (
      subscriptionExists?.Subscription?.subscritiptionId &&
      subscriptionExists?.Subscription?.active
    ) {
      //Canceling the current subscription and continuing the current plan.
      if (!subscriptionExists.Subscription.subscritiptionId) {
        throw new Error(
          "Could not find the subscription Id to cancel the subscription."
        );
      }
      console.log("Canceling the subscription");

      const currentSubscriptionDetails = await stripe.subscriptions.retrieve(
        subscriptionExists.Subscription.subscritiptionId
      );

      const subscription = await stripe.subscriptions.update(
        subscriptionExists.Subscription.subscritiptionId,
         {
          items: [
            {
              id: currentSubscriptionDetails.items.data[0].id,
            },
          ],
           cancel_at_period_end: true,
        }
      );
      return NextResponse.json({
        subscriptionId: subscription.id,
        //@ts-ignore
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }

    // if (
    //   subscriptionExists?.Subscription?.active === false ||
    //   subscriptionExists?.Subscription.active === true
    // ) {
    //   const currentSubscriptionDetails = await stripe.subscriptions.retrieve(
    //     subscriptionExists.Subscription.subscritiptionId
    //   );
    //   console.log("Resume Subscription");
    //   const subscription = await stripe.subscriptions.resume(
    //     subscriptionExists.Subscription.subscritiptionId,
    //     {
    //       billing_cycle_anchor: "unchanged",
    //     }
    //   );
    //   return NextResponse.json({
    //     subscriptionId: subscription.id,
    //     //@ts-ignore
    //     clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    //   });
    // }
  } catch (error) {
    console.log("🔴 Error", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
