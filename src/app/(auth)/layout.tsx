/* Custom Components */
import Provider from "@/components/UI/Provider";

/* Assets */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skoolify | Get Started!",
};

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <Provider>
      <main>{children}</main>
    </Provider>
  );
}

export default AuthLayout;
