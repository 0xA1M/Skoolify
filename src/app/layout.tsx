/* Assets */
import { Roboto_Mono as Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

interface Props {
  children: React.ReactNode;
}

function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          roboto.variable
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
