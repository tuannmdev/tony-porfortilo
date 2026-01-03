import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export function useRealtimeProfile() {
  const queryClient = useQueryClient();

  // Lazy initialize Supabase client only on client-side
  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createClient();
  }, []);

  useEffect(() => {
    // Skip if not on client-side or if client creation failed
    if (!supabase) return;

    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profile",
        },
        (payload) => {
          console.log("Profile changed:", payload);

          // Invalidate profile query to refetch
          queryClient.invalidateQueries({ queryKey: ["profile"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, supabase]);
}
