"use client";

import { useScrollRestoration } from "@/utils/ScrollRestoration";

export default function ClientScrollRestorer() {
  useScrollRestoration();
  return null;
}
