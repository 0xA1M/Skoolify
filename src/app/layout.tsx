/* Components */
import Provider from "@/components/Provider";
import Header from "@/components/Header";

/* Assets */
import "@/styles/globals.css";

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <main>
          <Provider>
            <Header />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
