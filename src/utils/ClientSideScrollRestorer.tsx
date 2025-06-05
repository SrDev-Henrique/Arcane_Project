"use client";

import { useScrollRestoration } from "@/components/ScrollRestoration";

export default function ClientScrollRestorer() {
  useScrollRestoration();
  return null;
}
