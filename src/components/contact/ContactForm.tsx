"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const supabase = createClient();
      const userAgent = navigator.userAgent;

      const { error } = await supabase
        .from("contact_messages")
        // @ts-ignore - Supabase type generation issue
        .insert({
          name: data.name,
          email: data.email,
          subject: null,
          company: null,
          phone: null,
          message: data.message,
          source: "website",
          user_agent: userAgent,
          priority: "normal",
        });

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message: "MESSAGE SENT SUCCESSFULLY! I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "FAILED TO SEND MESSAGE. Please try again or contact me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Status badge */}
      <div className="inline-flex items-center gap-2 bg-border-retro text-white px-2 py-1 w-fit rounded-sm mb-2 shadow-retro-sm">
        <span className="material-symbols-outlined text-sm">wifi</span>
        <span className="text-lg font-mono tracking-widest">STATUS: ONLINE</span>
      </div>

      {/* Title */}
      <h1 className="text-border-retro text-4xl lg:text-6xl font-black leading-none tracking-tight uppercase drop-shadow-sm font-display">
        Let's Connect!
      </h1>

      {/* Description */}
      <p className="text-border-retro/80 text-xl font-display leading-normal max-w-md mt-2 mb-6">
        I'm currently accepting new quests. Send a transmission below to initiate handshake protocol.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-xl">
        {/* Name & Email row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Name field */}
          <label className="flex flex-col flex-1 group">
            <div className="inline-block bg-white border-2 border-border-retro border-b-0 w-fit px-2 py-0.5 ml-2 -mb-0.5 z-10 font-bold text-border-retro text-lg tracking-wide">
              PLAYER NAME
            </div>
            <div className="relative">
              <input
                {...register("name")}
                className="w-full rounded-sm bg-[#eee4d6] border-2 border-border-retro text-border-retro p-3 pl-4 focus:outline-none focus:bg-white focus:ring-0 placeholder:text-border-retro/40 font-display text-xl transition-all h-14 shadow-[inset_2px_2px_4px_rgba(74,59,50,0.1)]"
                placeholder="Enter name..."
              />
              <div className="absolute right-3 top-4 text-border-retro/40">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-accent-red flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">error</span>
                {errors.name.message}
              </p>
            )}
          </label>

          {/* Email field */}
          <label className="flex flex-col flex-1 group">
            <div className="inline-block bg-white border-2 border-border-retro border-b-0 w-fit px-2 py-0.5 ml-2 -mb-0.5 z-10 font-bold text-border-retro text-lg tracking-wide">
              COMMS ID
            </div>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                className="w-full rounded-sm bg-[#eee4d6] border-2 border-border-retro text-border-retro p-3 pl-4 focus:outline-none focus:bg-white focus:ring-0 placeholder:text-border-retro/40 font-display text-xl transition-all h-14 shadow-[inset_2px_2px_4px_rgba(74,59,50,0.1)]"
                placeholder="name@email.com"
              />
              <div className="absolute right-3 top-4 text-border-retro/40">
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-accent-red flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">error</span>
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        {/* Message textarea */}
        <label className="flex flex-col w-full group">
          <div className="inline-block bg-white border-2 border-border-retro border-b-0 w-fit px-2 py-0.5 ml-2 -mb-0.5 z-10 font-bold text-border-retro text-lg tracking-wide">
            QUEST DETAILS
          </div>
          <textarea
            {...register("message")}
            className="w-full rounded-sm bg-[#eee4d6] border-2 border-border-retro text-border-retro p-4 focus:outline-none focus:bg-white focus:ring-0 placeholder:text-border-retro/40 font-display text-xl transition-all min-h-[180px] resize-y shadow-[inset_2px_2px_4px_rgba(74,59,50,0.1)]"
            placeholder="Describe your project or just say hi..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-accent-red flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">error</span>
              {errors.message.message}
            </p>
          )}
        </label>

        {/* Submit button row */}
        <div className="pt-2 flex items-center justify-between gap-4 mt-4">
          {/* Encryption status - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 text-border-retro/60 text-lg font-display">
            <span className="material-symbols-outlined text-lg animate-spin">sync</span>
            <span>ENCRYPTION_KEY_VALID</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden group bg-primary hover:bg-[#7a5235] text-white h-14 px-8 rounded-sm font-bold tracking-widest text-xl transition-all w-full md:w-auto flex items-center justify-center gap-3 border-2 border-border-retro shadow-retro hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#4a3b32] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin border-2 border-white border-r-transparent rounded-full" />
                <span>SENDING...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl">send</span>
                <span>UPLOAD MESSAGE</span>
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`border-2 border-border-retro p-4 rounded-sm flex items-start space-x-2 ${
              submitStatus.type === "success"
                ? "bg-accent-green/20 text-accent-green"
                : "bg-accent-red/20 text-accent-red"
            }`}
          >
            <span className="material-symbols-outlined">
              {submitStatus.type === "success" ? "check_circle" : "error"}
            </span>
            <span className="font-bold text-sm">{submitStatus.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
