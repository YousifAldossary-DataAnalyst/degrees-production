import React from "react";
import Image from "next/image";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

/* nav would have class=" translate-y-[-50%] " */

type Props = {
  user?: null | User;
};

const Navigation = () => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image
          src={"./planetEarth.svg"}
          width={90}
          height={90}
          alt="Planet Earth"
        />
        <span className="text-xl font-bold"> Degrees. </span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top[50%] transform translate-x-[-50%] ">
        {/* <ul className="flex items-center justify-center gap-4 list-none">
          <li>
            <Link href={"#"}>Pricing</Link>
          </li>
          <li>
            <Link href={"#"}>About</Link>
          </li>
          <li>
            <Link href={"#"}>Documentation</Link>
          </li>
          <li>
            <Link href={"#"}>Features</Link>
          </li>
        </ul> */}
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/agency"}
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {//WIP: Wire up user
            true ? 'Dashboard' : 'Log-in'}
          </span>
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
