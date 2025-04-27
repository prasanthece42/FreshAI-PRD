import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const { email } = await req.json();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // service role key for admin privileges
  );

  const { data, error } = await supabaseAdmin
    .from("auth.users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error checking email:", error.message);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }

  if (data) {
    // User exists
    return new Response(JSON.stringify({ exists: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ exists: false }), { status: 200 });
}
