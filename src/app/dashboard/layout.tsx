/* Custom Components */
import Provider from "@/components/UI/Provider";
import SideNavBar from "@/components/UI/SideNavBar";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <Provider>
      <main className="w-full h-screen flex">
        <SideNavBar />

        <main className="w-full h-full p-2">{children}</main>
      </main>
    </Provider>
  );
}

export default DashboardLayout;
