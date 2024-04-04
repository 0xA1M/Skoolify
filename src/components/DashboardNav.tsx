"use client";
/* Components */
import {
  Avatar,
  Badge,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {
  LuCopy,
  LuFilePlus2,
  LuPencil,
  LuTrash2,
  LuBell,
} from "react-icons/lu";

/* Header Component */
function DashboardNav() {
  return (
    <Navbar maxWidth="full" className="drop-shadow-md">
      <NavbarContent
        justify="start"
        className="flex flex-row-reverse items-center"
      >
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                showFallback
                as="button"
                className="transition-transform"
              />
            </DropdownTrigger>

            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
            >
              <DropdownSection title="Actions" showDivider>
                <DropdownItem
                  key="new"
                  shortcut="⌘N"
                  description="Create a new file"
                  startContent={<LuFilePlus2 className="text-danger" />}
                >
                  New file
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  shortcut="⌘C"
                  description="Copy the file link"
                  startContent={<LuCopy className="text-danger" />}
                >
                  Copy link
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  shortcut="⌘⇧E"
                  description="Allows you to edit the file"
                  startContent={<LuPencil className="text-danger" />}
                >
                  Edit file
                </DropdownItem>
              </DropdownSection>

              <DropdownSection title="Danger zone">
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  shortcut="⌘⇧D"
                  description="Permanently delete the file"
                  startContent={<LuTrash2 className="text-danger" />}
                >
                  Delete file
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem className="h-9">
          <Divider
            orientation="vertical"
            className="px-px border-1 bg-primary-500"
          />
        </NavbarItem>

        <NavbarItem className="flex items-center">
          <Badge
            color="danger"
            content="5"
            placement="top-right"
            shape="circle"
            showOutline={false}
            aria-label="5 new notifications"
            size="sm"
            className="cursor-pointer"
          >
            <LuBell size={20} className="cursor-pointer" />
          </Badge>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default DashboardNav;
