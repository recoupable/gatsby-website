import { NextResponse } from "next/server";

type CaptureFanRequestBody = {
  email?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFirstEnvValue(keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) return value.trim();
  }
  return undefined;
}

/**
 * Captures a fan email from the Gatsby website and stores it in Supabase fans table.
 */
export async function POST(request: Request) {
  const supabaseUrl = getFirstEnvValue(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]);
  const supabaseServiceRoleKey = getFirstEnvValue([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SERVICE_KEY",
  ]);
  const fansClientId = process.env.FANS_CLIENT_ID || "GatsbyWebsite1";

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error(
      "Missing Supabase env vars for fans capture route. Expected SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY).",
    );
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }

  let body: CaptureFanRequestBody;
  try {
    body = (await request.json()) as CaptureFanRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/fans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email,
      clientId: fansClientId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to insert fan email:", errorText);
    return NextResponse.json({ error: "Unable to save email right now." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
