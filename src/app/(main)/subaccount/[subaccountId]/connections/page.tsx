import BlurPage from "@/components/global/blur-page";
import { CONNECTIONS } from "@/lib/constants";
import React from "react";
import ConnectionCard from "./_components/conncetions-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

//WIP: CONNECTIONS to be completed
const ConnectionsPage = (props: Props) => {
  return (
    <BlurPage>
      <div className="absolute -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
          <Card>
            <CardHeader>
              <CardTitle>Soon...</CardTitle>
              <CardDescription>
                Currently under development. Works with Workflows.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      {" "}
      <div className="relative flex flex-col gap-4">
        <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
          Connections
        </h1>
        <div className="relative flex flex-col gap-4">
          <section className="flex flex-col gap-4 p-6 text-muted-foreground">
            Connect all your apps directly from here. You may need to connect
            these apps regularly to refresh verification. <br />
            <small className="text-white">This step is for automation</small>
            {CONNECTIONS.map((connection) => (
              <ConnectionCard
                key={connection.title}
                description={connection.description}
                title={connection.title}
                icon={connection.image}
                type={connection.title}
                // connected={connections}
              />
            ))}
          </section>
        </div>
      </div>
    </BlurPage>
  );
};

export default ConnectionsPage;
