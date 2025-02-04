"use client";

import * as React from "react";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogIn from "./log-in";
import { useStore } from "../store/useStore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const profile = useStore((state) => state.profile)
  const logOut = useStore((state) => state.logOut)

  const removeProfileFromLocalStorage = () => {
    localStorage.removeItem("profile");
    logOut()
  }
 
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='flex items-center justify-between m-auto mt-[10px] max-w-[1000px]'>
      {/* Navbar Links */}
      <div className="flex items-center w-[150px] justify-between">
        <Link href="/" className="outline-none">
          <Button
            className={`${
              pathname === "/" ? "bg-gray-200 text-black dark:bg-gray-800 dark:text-white" : ""
            }`}
          >
            Home
          </Button>
        </Link>
        <Link href="/pages/posts" className="outline-none">
          <Button
            className={`${
              pathname === "/pages/posts" ? "bg-gray-200 text-black dark:bg-gray-800 dark:text-white" : ""
            }`}
          >
            Posts
          </Button>
        </Link>
      </div>

      {/* Theme Toggle & Login Button */}
      <div className={`${ profile ? 'flex items-center gap-[10px]' : 'flex items-center gap-[10px]'}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {mounted && theme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* LogIn */}
        {
          profile ? (
            <Popover>
              <PopoverTrigger asChild>
                  <div className='flex items-center gap-[5px] cursor-pointer'>
                    <CircleUserRound/>
                    <p className="text-[12px]">{profile.name}</p>
                  </div>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-30">
                  <Button onClick={removeProfileFromLocalStorage}>LogOut</Button>
                  <Link className="mt-[5px]" href={`/pages/profile`}>
                    <Button>Profile</Button>
                  </Link>
                  </PopoverContent>
              </Popover>
          ) : (
            <LogIn/>
          )
        }
      </div>
    </div>
  );
};

export default Header;
