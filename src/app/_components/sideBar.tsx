"use client";
import React from "react";
import { ThemeContext } from "../_providers/index";
import { useContext } from "react";
import Link from "next/link";
import { robotoFont } from "../fonts";

export default function Sidebar() {
  const { appTheme, showSidebar } = useContext(ThemeContext);
  const getTranslate = () => {
    if (showSidebar === false) {
      return `translate-x-full`;
    } else return null;
  };
  return (
    <div
      className={`${
        robotoFont.className
      } hidden sm:flex flex-col gap-6 -mt-[2px] pt-10 items-center
      bg-${appTheme}-containerBg text-${appTheme}-text px-4 text-xs xl:text-xl lg:text-lg md:text-base sm:text-xs absolute h-[calc(100vh-4rem)] top-16 -left-1/4 w-1/4 transition duration-500 ${getTranslate()} `}
    >
      <Link
        href="/categories"
        className={`min-w-full flex justify-center lg:text-nowrap hover:bg-${appTheme}-bodyBg rounded-md p-2`}
      >
        Categories
      </Link>
      <Link
        href="/products"
        className={`min-w-full flex justify-center hover:bg-${appTheme}-bodyBg rounded-md p-2 `}
      >
        All Products
      </Link>
      <Link
        href="/admin-panel"
        className={`min-w-full flex justify-center hover:bg-${appTheme}-bodyBg rounded-md p-2 `}
      >
        Admin
      </Link>
      <Link
        href="/about"
        className={`min-w-full flex justify-center hover:bg-${appTheme}-bodyBg rounded-md p-2 `}
      >
        About
      </Link>
    </div>
  );
}
