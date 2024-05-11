"use client";
import React, { useState } from "react";
import { useModal } from "@/providers/modal-provider";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  customerId: string;
  planExists: boolean;
};

const CancelationForm = ({ customerId, planExists }: Props) => {
  const { data, setClose } = useModal();

  const router = useRouter();

  //   const [subscriptionStatus, setSubscriptionStatus] = useState<{
  //     subscriptionId: string;
  //     clientSecret: string;
  //   }>({ subscriptionId: "", clientSecret: "" });

  const handleCancelingSubscription = () => {
    if (!planExists) return;
    const cancelSubscritpion = async () => {
      const subscriptionResponse = await fetch(
        "/api/stripe/cancel-subscription",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId,
          }),
        }
      );
      
      // const subscriptionResponseData = await subscriptionResponse.json();
      // setSubscriptionStatus({
      //   clientSecret: subscriptionResponseData.clientSecret,
      //   subscriptionId: subscriptionResponseData.customerId,
      // });
    
      //if function
      toast({
        title: "Success",
        description: "Canceled your subscriptions",
      });
      setClose();
      router.refresh();
    };
    cancelSubscritpion();
  };
  return (
    <div className="border-none rounded-full cursor-pointertext-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap">
      <div>
        {planExists && (
          <>
            <Button
              onClick={handleCancelingSubscription}
              className="cursor-pointertext-red-600 hove:bg-red-600 hover:text-white"
            >
              Yes
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CancelationForm;
