import BlurPage from "@/components/global/blur-page";
import React from "react";
import WorkflowButton from "./[workflowId]/_components/workflow-button";
import Workflows from "./[workflowId]/_components";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, Link } from "lucide-react";

type Props = {};

const WorkflowsPage = (props: Props) => {
  return (
    <BlurPage>
      <div className="flex flex-col relative">
        <div className="absolute -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
          <Card>
            <CardHeader>
              <CardTitle>Soon...</CardTitle>
              <CardDescription>
                Currently under development.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Workflows
        <WorkflowButton />
      </h1>
      <Workflows />
    </div>
    </BlurPage>
  );
};

export default WorkflowsPage;
