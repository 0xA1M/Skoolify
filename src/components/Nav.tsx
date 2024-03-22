"use client";
/* Utils */
import { useState } from "react";

/* Components */
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Link,
} from "@nextui-org/react";

/* Custom Components */
import Logo from "./UI/Logo";
import ThemeSwitcher from "./UI/ThemeSwitcher";

/* Types */
export type Menu = {
  link: string;
  label: string;
}[];

/* Header Component */
function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navItems: Menu = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "#features",
      label: "Features",
    },
    {
      link: "#contact",
      label: "Contact Us",
    },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBlurred
      className="drop-shadow-md"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand className="hidden lg:flex lg:mr-4">
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-2 lg:gap-4" justify="center">
        {navItems.map((item, i) => (
          <NavbarItem key={i}>
            <Button
              className="drop-shadow-lg"
              as={Link}
              href={item.link}
              color="primary"
              variant="light"
            >
              <p className="text-foreground text-medium">{item.label}</p>
            </Button>
          </NavbarItem>
        ))}

        <ThemeSwitcher />
      </NavbarContent>

      <NavbarContent className="lg:mr-unit-md lg:ml-8" justify="end">
        <NavbarItem>
          <Button
            className="drop-shadow-lg"
            as={Link}
            href="/login"
            color="secondary"
            variant="ghost"
          >
            <p className="text-foreground text-medium">Login</p>
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            className="drop-shadow-lg"
            as={Link}
            href="/register"
            color="secondary"
            variant="solid"
          >
            <p className="text-foreground text-medium">Sign Up</p>
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="flex justify-between w-full p-2 items-center">
          <NavbarBrand>
            <Link href="/">
              <Logo />
            </Link>
          </NavbarBrand>

          <ThemeSwitcher />
        </NavbarMenuItem>

        {navItems.map((item, i) => (
          <NavbarMenuItem key={i}>
            <Button
              color="primary"
              variant="light"
              size="lg"
              className="w-full p-4 flex justify-start items-center"
            >
              <Link
                onClick={() => setIsMenuOpen(false)}
                color="foreground"
                href={item.link}
                size="lg"
              >
                {item.label}
              </Link>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
