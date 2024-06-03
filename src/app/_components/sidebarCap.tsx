"use client";
import React from "react";
import { useContext } from "react";
import Link from "next/link";
import { lobsterFont } from "../fonts";
import { Logo } from "./index";
import { ThemeContext } from "../_providers/index";

export default function SidebarCap() {
  const { appTheme } = useContext(ThemeContext);

  return (
    <Link href="/">
      <div
        className={`min-h-16 max-h-16 flex flex-col items-center justify-center text-${appTheme}-text bg-${appTheme}-containerBg border-${appTheme}-border ${lobsterFont.className} w-full`}
      >
        <Logo size={"small"} />
      </div>
    </Link>
  );
}
