import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types/database";

interface UseProjectsOptions {
  category?: "web" | "mobile" | "api" | "desktop" | "ai-ml" | "other";
  status?: "planning" | "in-progress" | "completed" | "archived";
  featured?: boolean;
  search?: string;
  limit?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const supabase = createClient();
  const { category, status, featured, search, limit } = options;

  return useQuery({
    queryKey: ["projects", category, status, featured, search, limit],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("order_index");

      if (category) {
        query = query.eq("category", category);
      }

      if (status) {
        query = query.eq("status", status);
      }

      if (featured !== undefined) {
        query = query.eq("featured", featured);
      }

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,short_description.ilike.%${search}%,full_description.ilike.%${search}%`
        );
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Project[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
