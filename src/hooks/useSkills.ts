import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Skill } from "@/types/database";

interface UseSkillsOptions {
  category?: "primary" | "secondary" | "tools" | "soft-skills" | "languages";
  featured?: boolean;
}

export function useSkills(options: UseSkillsOptions = {}) {
  const supabase = createClient();
  const { category, featured } = options;

  return useQuery({
    queryKey: ["skills", category, featured],
    queryFn: async () => {
      let query = supabase.from("skills").select("*").order("order_index");

      if (category) {
        query = query.eq("category", category);
      }

      if (featured !== undefined) {
        query = query.eq("is_featured", featured);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Skill[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
