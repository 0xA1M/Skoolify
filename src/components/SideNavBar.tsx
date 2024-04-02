"use client";
import { useState } from "react";
/* Components */
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function SideNavBar() {
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);

  const handleCollapse = () => {
    setCollapseMenu((prevState) => !prevState);
  };

  return (
    <Sidebar
      className="h-full"
      backgroundColor="#4169E1"
      transitionDuration={150}
      collapsed={collapseMenu}
    >
      <Menu>
        <button onClick={handleCollapse}>Close</button>
      </Menu>

      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideNavBar;
