"use client";
/* Utils */
import { usePathname } from "next/navigation";

/* Custom Components */
import Provider from "@/components/UI/Provider";
import SideNavBar from "@/components/UI/SideNavBar";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <Provider>
      <main className="w-full h-screen flex">
        {!pathname.includes("notifications") &&
          !pathname.includes("settings") && <SideNavBar />}

        <main className="w-full h-full p-2">{children}</main>
      </main>
    </Provider>
  );
}

export default DashboardLayout;
