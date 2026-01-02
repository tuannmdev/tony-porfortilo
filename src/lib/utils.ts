import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Calculate duration between two dates in months
 */
export function calculateDurationInMonths(
  startDate: Date | string,
  endDate?: Date | string | null
): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = endDate
    ? typeof endDate === "string"
      ? new Date(endDate)
      : endDate
    : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return months;
}

/**
 * Format duration in months to human readable string
 */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "year" : "years"}`;
  }

  return `${years} ${years === 1 ? "year" : "years"}, ${remainingMonths} ${
    remainingMonths === 1 ? "month" : "months"
  }`;
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Check if an experience is current (no end date)
 */
export function isCurrentExperience(endDate: string | null): boolean {
  return endDate === null;
}

/**
 * Calculate experience duration in months
 * Matches the Supabase function calculate_experience_duration
 */
export function calculateExperienceDuration(
  startDate: string | Date,
  endDate?: string | Date | null
): number {
  return calculateDurationInMonths(startDate, endDate);
}
