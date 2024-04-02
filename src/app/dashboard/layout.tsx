/* Custom Components */
import Provider from "@/components/UI/Provider";
import SideNavBar from "@/components/SideNavBar";
import Nav from "@/components/Nav";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <Provider>
      <Nav isHome={false} />

      <main className="w-full h-screen flex">
        <SideNavBar />

        {children}
      </main>
    </Provider>
  );
}

export default DashboardLayout;
