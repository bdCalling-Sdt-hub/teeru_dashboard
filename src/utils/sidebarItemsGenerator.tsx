import { JSX } from "react";
import { NavLink } from "react-router-dom";

// Define types for the input item and child item
interface SidebarItem {
  key: string;
  path?: string;
  name?: string;
  icon?: string;
  children?: {
    key: string;
    path?: string;
    name?: string;
    icon: React.ReactElement | null;
  }[]; // Recursive type for nested children
}

// Define the structure of the sidebar item object that will be returned
interface SidebarMenuItem {
  key: string;
  icon: JSX.Element | null;
  label: JSX.Element;
  children?: SidebarMenuItem[]; // Nested items can also follow this structure
}

export const sidebarItemsGenerator = (
  items: SidebarItem[],
  role: string
): SidebarMenuItem[] => {
  const sidebarItems = items.reduce<SidebarMenuItem[]>((acc, item) => {
    // Add main item if it has path and name
    if (item.path && item.name) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
                : undefined,
            }}
          />
        ) : null,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    // Add children if present
    if (item.children && item.children.length > 0) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item?.path as string)
                ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
                : undefined,
            }}
          />
        ) : null,
        label: <span className="">{item.name}</span>,
        children: item.children
          .filter((child) => child.name) // Ensure child has a name
          .map((child) => ({
            key: child.key,
            icon: child?.icon ? child.icon : null,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })),
      });
    }

    return acc;
  }, []); // Make sure to initialize the accumulator as an empty array

  return sidebarItems;
};
