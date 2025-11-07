"use client";

import React from "react";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  return <main className="pt-0">{children}</main>;
}