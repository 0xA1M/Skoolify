/* Custom Components */
import Provider from "@/components/UI/Provider";

interface Props {
  children: React.ReactNode;
}

function TeacherDashboardLayout({ children }: Props) {
  return (
    <Provider>
      <main className="w-full h-screen flex p-2">{children}</main>
    </Provider>
  );
}

export default TeacherDashboardLayout;
