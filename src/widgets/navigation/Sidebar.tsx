import { Component } from "solid-js";

import SidebarHeading from "./SidebarHeading";
import SourceList from "../source/SourceList";

const Sidebar: Component = () => {
  return (
    <>
      <SidebarHeading label="Home" icon="fa-solid fa-home" href="/" />
      {/* <SidebarHeading
        label="Notes"
        icon="fa-solid fa-sticky-note"
        href="/notes"
      /> */}
      <SidebarHeading
        label="Reports"
        icon="fa-solid fa-chart-bar"
        href="/reports"
      />
      <SidebarHeading
        label="Saved Queries"
        icon="fa-solid fa-bookmark"
        href="/saved"
      />
      <SidebarHeading
        label="Query Browser"
        icon="fa-solid fa-magnifying-glass"
        href="/browse"
      />
      <div class="mt-4 border-b border-gray-800" />
      <SourceList />
      <SidebarHeading
        label="Settings"
        icon="fa-solid fa-cog"
        href="/settings"
      />
    </>
  );
};

export default Sidebar;