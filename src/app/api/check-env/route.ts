import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Get all NEXT_PUBLIC env vars
  const allNextPublicEnvs = Object.keys(process.env)
    .filter(key => key.startsWith("NEXT_PUBLIC"))
    .sort();

  return NextResponse.json({
    // Boolean checks
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,

    // URL info
    urlLength: supabaseUrl?.length || 0,
    urlPrefix: supabaseUrl?.substring(0, 30) || "MISSING",
    urlSuffix: supabaseUrl?.substring(supabaseUrl.length - 20) || "MISSING",

    // Key info
    keyLength: supabaseKey?.length || 0,
    keyPrefix: supabaseKey?.substring(0, 30) || "MISSING",
    keySuffix: supabaseKey?.substring(supabaseKey.length - 20) || "MISSING",

    // All NEXT_PUBLIC env vars available
    availableEnvVars: allNextPublicEnvs,

    // Detailed check
    checks: {
      urlIsDefined: supabaseUrl !== undefined,
      urlIsNotEmpty: supabaseUrl !== "",
      urlStartsWithHttps: supabaseUrl?.startsWith("https://"),
      urlEndsWithSupabaseCo: supabaseUrl?.endsWith(".supabase.co"),
      keyIsDefined: supabaseKey !== undefined,
      keyIsNotEmpty: supabaseKey !== "",
      keyStartsWithEyJ: supabaseKey?.startsWith("eyJ"),
    },

    // Environment
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
