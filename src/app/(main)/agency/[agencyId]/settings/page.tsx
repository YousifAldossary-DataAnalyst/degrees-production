import AgencyDetails from "@/components/forms/agency-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import UserDetails from '@/components/forms/user-details'

type Props = {
  params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
  //Auther
  const authUser = await currentUser();
  if (!authUser) return null;

  // User Details
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return null;

  // Agency Details
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  // subaccounts
  const subAccounts = agencyDetails.SubAccount;

  return <div className="flex lg:!flex-row flex-col gap-4">
    <AgencyDetails data={agencyDetails}/>
    <UserDetails type="agency"
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetails}/>
  </div>;
};

export default SettingsPage;
