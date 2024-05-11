import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};

export default Layout;
