"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="border-2 border-border-retro bg-panel-retro p-8 shadow-retro-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 border-2 border-border-retro bg-primary px-4 py-2 text-panel-retro shadow-retro-btn mb-4">
              <span className="material-symbols-outlined">lock</span>
              <span className="text-sm font-bold">ADMIN ACCESS</span>
            </div>
            <h1 className="text-3xl font-bold text-primary uppercase">
              Login
            </h1>
            <p className="text-sm text-text-muted mt-2">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 border-2 border-accent-red bg-accent-red/20 p-4 flex items-start space-x-2">
              <span className="material-symbols-outlined text-accent-red">
                error
              </span>
              <p className="text-sm text-accent-red font-bold">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text-main mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full border-2 border-border-retro bg-bg-retro px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 border-2 border-border-retro bg-primary px-6 py-4 text-panel-retro shadow-retro-btn transition-transform hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin border-2 border-panel-retro border-r-transparent rounded-full" />
                  <span className="font-bold">LOGGING IN...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  <span className="font-bold">LOGIN</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-primary hover:underline flex items-center justify-center space-x-1"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              <span>Back to Home</span>
            </a>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 border-2 border-border-retro bg-panel-retro p-4 shadow-retro text-sm text-text-muted">
          <p className="font-bold text-primary mb-2">SETUP INSTRUCTIONS:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create admin user in Supabase Auth</li>
            <li>Set ADMIN_EMAIL in .env.local</li>
            <li>Update RLS policies with your email</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
