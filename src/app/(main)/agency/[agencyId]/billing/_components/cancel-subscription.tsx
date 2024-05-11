'use client'
import CancelationForm from "@/components/forms/subscription-form/cancelation-form"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useModal } from '@/providers/modal-provider'
import React, { useEffect, useMemo, useState } from 'react'
import CustomModal from "@/components/global/custom-modal"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

type Props = {
    customerId: string
    planExists: boolean
    buttonCta: string
  }

  const CancelPlans = ({customerId, planExists, buttonCta}: Props) =>{
    const { setOpen } = useModal()
    const searchParams = useSearchParams()
    const plan = searchParams.get('plan')
    const handleManagePlan = async () => {
    setOpen(
      <CustomModal
        title={'Would you cancel or resume your plans?'}
        subheading="You can either cancel or resume your plan."
      >
        <CancelationForm
          customerId={customerId}
          planExists={planExists}
        />
      </CustomModal>,
      async () => ({
        plans: {
          defaultPriceId: plan ? plan : ''
        },
      })
    )
  }
  return (
        <Card className="w-300px">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Would you like to cancel or resume subscription?
              </p>
            </div>

            <Button
              className="md:w-fit w-full"
              onClick={handleManagePlan}
            >
              {buttonCta}
            </Button>
          </div>
        </Card>
  )
}


export default CancelPlans
