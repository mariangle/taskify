import { deleteToken } from "./logoutAction";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitchDropdown from "@/components/theme-switch-dropdown";
import { Icons } from "@/components/icons";

export default function UserNav(){
  
    const dropdownItems = [
      { label: "Analytics", key: "analytics", icon: <Icons.lineChart className="mr-2 h-4 w-4" />, href: "/analytics" },
      { label: "Billing", key: "billing", icon: <Icons.creditCard className="mr-2 h-4 w-4" />, href: "/settings/account" },
      { label: "Account Settings", key: "account", icon: <Icons.settings className="mr-2 h-4 w-4" />, href: "/settings/account", shortcut: "⌘S"},
    ];

  const onLogout = async () => {
    deleteToken();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
              {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.key} >
                      {item.icon}
                      <span>{item.label}</span>
                      <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  </DropdownMenuItem>
              ))}
              <ThemeSwitchDropdown />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
              <DropdownMenuItem>
                  <Icons.support className="mr-2 h-4 w-4" />
                  <span>Support</span>
              </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout}>
                  <Icons.logOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
              </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
  