/* Custom Components */
import Provider from "@/components/UI/Provider";
import Container from "@/components/UI/Container";
import Nav from "@/components/Nav";
import TopButton from "@/components/UI/TopButton";

/* Assets */
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skoolify | The School Management Tool",
};

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth scroll-p-24"
    >
      <body className={roboto.className}>
        <Provider>
          <Nav />
          <Container>
            {children}
            <TopButton />
          </Container>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
