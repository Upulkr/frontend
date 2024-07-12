"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import ProfileUser from "./../Profile/Profile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

const Topbar = () => {
  const pathName = usePathname();

  const topRoutes = [
    { label: "LogIn", path: "/logIn" },
    { label: "SignIn", path: "/Sign In" },
  ];

  //   const sidebarRoutes = [
  //     { label: "LogIn", path: "/logIn" },
  //     { label: "SignIn", path: "/Sign In" },
  //   ];
  const user = localStorage.getItem("username");

  return (
    <div className="flex justify-between items-center p-4 bg-blue-800">
      <Link href="/">
        <h2 className="md:text-3xl sm:text-xl font-bold text-white justify-center text-center mx-auto relative md:left-20 ">
          You Book.com
        </h2>
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex"></div>

      <div className="flex gap-6 items-center">
        {/* <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-[#FDAB04]"
            >
              {route.label}
            </Link>
          ))}
        </div> */}

        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {topRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-sm font-medium hover:text-[#FDAB04]"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>

              {/* {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#FDAB04]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )} */}
            </SheetContent>
          </Sheet>
        </div>
        <div className="sm:flex hidden space-x-2">
          <div className="flex space-x-10">
            <Link href="/register">
              <Button className="bg-white text-blue-500 font-bold">
                Register
              </Button>
            </Link>
            {!user ? (
              <Link href="/sign-in">
                <Button className="bg-white text-blue-500 font-bold">
                  Sign In
                </Button>
              </Link>
            ) : (
              <ProfileUser user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
