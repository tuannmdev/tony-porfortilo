import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Experience, ExperienceWithComputed } from "@/types/database";
import {
  isCurrentExperience,
  calculateExperienceDuration,
} from "@/lib/utils";

interface UseExperienceOptions {
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  currentOnly?: boolean;
}

export function useExperience(options: UseExperienceOptions = {}) {
  const supabase = createClient();
  const { employmentType, currentOnly } = options;

  return useQuery({
    queryKey: ["experience", employmentType, currentOnly],
    queryFn: async () => {
      let query = supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });

      if (employmentType) {
        query = query.eq("employment_type", employmentType);
      }

      if (currentOnly) {
        query = query.is("end_date", null);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Add computed fields
      const experiencesWithComputed: ExperienceWithComputed[] = (
        data as Experience[]
      ).map((exp) => ({
        ...exp,
        is_current: isCurrentExperience(exp.end_date),
        duration_months: calculateExperienceDuration(
          exp.start_date,
          exp.end_date
        ),
      }));

      return experiencesWithComputed;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
