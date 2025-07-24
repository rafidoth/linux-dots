"use client";
import { AnimatedBackground } from "@/components/ui/animated-background";
import React from "react";
import ThemeChanger from "./ThemeChanger";
import Link from "next/link";
import Logo from "./Logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { logo_path } from "@/app/config.jigao";

const arr = ["Getting Started", "Guides", "Community", "Pricing", "Contact"];

export default function NavigationBar() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <main className={`w-[1200px] flex flex-col justify-center items-center`}>
      <div className={`flex w-full  h-[100px] justify-between items-center`}>
        <div className="flex">
          <Logo src={logo_path} />
        </div>
        <div className="flex w-full h-full justify-center items-center ">
          <AnimatedTabsHover />
        </div>
        <div className={`flex gap-x-2 w-[200]`}>
          <ThemeChanger />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <span
              className={`
              bg-black dark:bg-white hover:bg-jigao/70 text-black rounded-full w-[100px]
              flex justify-center items-center px-2 py-1
            `}
            >
              <SignInButton />
            </span>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}

export function AnimatedTabsHover() {
  const TABS = ["Home", "About", "Services", "Contact"];

  return (
    <div className="flex flex-row">
      <AnimatedBackground
        defaultValue={TABS[0]}
        className="rounded-lg bg-zinc-100 dark:bg-zinc-900"
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.3,
        }}
        enableHover
      >
        {TABS.map((tab, index) => (
          <button
            key={index}
            data-id={tab}
            type="button"
            className="px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 text-xl"
          >
            {tab}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}

{
  /* {arr.map((item, index) => {
            return (
              <NavigationMenu key={index}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            );
          })} */
}
