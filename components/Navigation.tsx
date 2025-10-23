/* eslint-disable */
/* @ts-nocheck */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationLink: any = [
  {
    title: "Blog",
    href: "/blog",
    type: "simple",
  },
  {
    title: "Pricing",
    href: "/pricing ",
    type: "simple",
  },
  {
    title: "About Us",
    href: "/about-us",
    type: "simple",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    type: "simple",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <div className="sticky top-0 bg-[#F9F4F0] z-50 py-4">
      <div className="flex items-center justify-between w-full md:max-w-[1200px] mx-auto py-2 px-4">
        {/* Logo */}
        <Link href="/">
          <p className="text-[#104127] font-bold text-[24px]">EasyWrite</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationLink?.map((link: any, index: number) => (
                <NavigationList
                  key={index}
                  title={link?.title}
                  subMenu={link?.subMenu}
                  type={link?.type}
                  href={link?.href}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-10">
            <Button className="bg-[#104127] hover:bg-[#104127] text-white rounded-full text-xl px-9 py-6">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-[#1A4048]" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] overflow-y-auto"
              >
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-[#1A4048] text-xl font-bold">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2">
                  {navigationLink?.map((link: any, index: number) => (
                    <MobileNavigationItem
                      key={index}
                      title={link?.title}
                      subMenu={link?.subMenu}
                      type={link?.type}
                      href={link?.href}
                      closeSheet={closeSheet}
                    />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

function NavigationList({ title, type, href, subMenu, ...props }: any) {
  return (
    <li {...props}>
      {type === "simple" ? (
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} hover:bg-transparent focus:bg-transparent`}
          >
            <Link href={href}>
              <p className="text-lg text-[#1A1A1A]">{title}</p>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ) : (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg">
            <p className="text-[#1A1A1A]">{title}</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {subMenu?.map((item: any) => {
                  return (
                    <NavigationMenuLink asChild key={item?.href} className="">
                      <Link href={item?.href}>
                        <p className="text-normal text-[#1A4048]">
                          {item?.title}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )}
    </li>
  );
}

function MobileNavigationItem({ title, type, href, subMenu, closeSheet }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (type === "simple") {
    return (
      <SheetClose asChild>
        <Link
          href={href}
          className="flex items-center justify-between py-3 px-2 text-[#1A4048] font-medium hover:text-[#05C8E8] hover:bg-gray-50 rounded-lg transition-all duration-200"
          onClick={closeSheet}
        >
          {title}
        </Link>
      </SheetClose>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-2 text-[#1A4048] font-medium hover:text-[#05C8E8] hover:bg-gray-50 rounded-lg transition-all duration-200">
        {title}
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4 mt-1 space-y-1">
        {subMenu?.map((item: any) => (
          <SheetClose asChild key={item?.href}>
            <Link
              href={item?.href}
              className="block py-2 px-3 text-sm text-[#1A4048] hover:text-[#05C8E8] hover:bg-gray-50 rounded-md transition-all duration-200"
              onClick={closeSheet}
            >
              {item?.title}
            </Link>
          </SheetClose>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
