import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import ProfileCard from "@/components/home/ProfileCard";
import QuickStats from "@/components/home/QuickStats";
import AttributePoints from "@/components/home/AttributePoints";
import InventoryProjects from "@/components/home/InventoryProjects";
import QuestLog from "@/components/home/QuestLog";

export const metadata: Metadata = generateSEO({
  title: "Home",
  description:
    "Welcome to my portfolio. Senior Software Engineer specializing in full-stack development with React, Next.js, and modern web technologies.",
  url: "/",
});

export default function Home() {
  return (
    <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 flex justify-center">
      <div className="layout-content-container flex flex-col max-w-[1100px] flex-1 gap-8">
        {/* Hero Section */}
        <div className="flex flex-col gap-2 border-b-2 border-border-retro border-dashed pb-6">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined animate-pulse">
              sports_esports
            </span>
            <p className="text-lg font-bold uppercase tracking-widest">
              System Ready
            </p>
          </div>
          <h1 className="text-text-main text-5xl md:text-6xl font-bold leading-none tracking-tight uppercase drop-shadow-sm">
            Choose Your Configuration
          </h1>
          <p className="text-text-muted text-xl font-normal leading-normal max-w-2xl">
            Select a profile to view technical specifications, completed quests,
            and inventory items.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-4">
            <ProfileCard />
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Quick Stats */}
            <QuickStats />

            {/* Attribute Points (Skills) */}
            <AttributePoints />

            {/* Inventory (Projects) */}
            <InventoryProjects />

            {/* Quest Log (Experience) */}
            <QuestLog />
          </div>
        </div>
      </div>
    </main>
  );
}
