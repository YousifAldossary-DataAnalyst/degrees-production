"use client";

import React from "react";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { usePathname } from "next/navigation";
import { db } from "@/lib/db";

type Props = {};

const AutomationOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-row justify-center gap-6 items-center px-4 py-4 w-full ">
      
      <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
        <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
          <LucideMousePointerClick className="dark:text-white" size={18} />
          <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
        </div>
        <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
          <GitBranch className="text-muted-foreground" size={18} />
          <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
        </div>
        <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
          <Database className="text-muted-foreground" size={18} />
          <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
        </div>
        <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
          <GitBranch className="text-muted-foreground" size={18} />
        </div>
      </div>
    </div>
  );
};

export default AutomationOptions;
