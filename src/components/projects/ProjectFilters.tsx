"use client";

interface ProjectFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: "all", label: "ALL QUESTS" },
  { value: "web", label: "FRONTEND" },
  { value: "api", label: "BACKEND" },
  { value: "mobile", label: "MOBILE" },
  { value: "desktop", label: "DESKTOP" },
];

export default function ProjectFilters({
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 p-3 bg-border-retro border-4 border-border-retro rounded-lg shadow-retro">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 font-bold text-xs md:text-sm uppercase tracking-wide border-2 transition-all ${
            activeFilter === filter.value
              ? "bg-panel-retro text-border-retro border-panel-retro shadow-[inset_0_0_0_2px_#4a3b32]"
              : "bg-primary text-panel-retro border-transparent hover:bg-panel-retro hover:text-border-retro hover:border-panel-retro"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
