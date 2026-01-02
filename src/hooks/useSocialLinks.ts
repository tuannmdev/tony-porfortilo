import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { SocialLink } from "@/types/database";

export function useSocialLinks() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["social-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .eq("is_active", true)
        .order("order_index");

      if (error) throw error;
      return data as SocialLink[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
