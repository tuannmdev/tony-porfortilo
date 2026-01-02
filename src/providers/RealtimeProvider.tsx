"use client";

import { ReactNode } from "react";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useRealtimeProjects } from "@/hooks/useRealtimeProjects";

export default function RealtimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Subscribe to realtime updates
  useRealtimeProfile();
  useRealtimeProjects();

  return <>{children}</>;
}
