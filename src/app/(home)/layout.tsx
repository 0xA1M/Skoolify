/* Components */
import { Divider } from "@nextui-org/divider";

/* Custom Components */
import Provider from "@/components/UI/Provider";
import Container from "@/components/UI/Container";
import Nav from "@/components/Nav";
import TopButton from "@/components/UI/TopButton";
import Footer from "@/components/Footer";

/* Assets */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skoolify | The School Management Tool",
};

interface Props {
  children: React.ReactNode;
}

function HomeLayout({ children }: Props) {
  return (
    <Provider>
      <Nav isHome />
      <Container>
        {children}
        <TopButton />
      </Container>
      <Divider />
      <Footer />
    </Provider>
  );
}

export default HomeLayout;
