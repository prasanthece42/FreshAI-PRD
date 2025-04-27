import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export async function POST(req) {
  const { token, password } = await req.json();

  // Validate the token
  const { data: resetData, error: resetError } = await supabase
    .from('password_resets')
    .select('*')
    .eq('token', token)
    .single();

  if (resetError || !resetData) {
    return new Response(
      JSON.stringify({ message: 'Invalid or expired token' }),
      { status: 400 }
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password in the 'users' table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('id', resetData.user_id);

  if (userError) {
    return new Response(
      JSON.stringify({ message: 'Error updating password' }),
      { status: 500 }
    );
  }

  // Optionally, delete the reset token to prevent reuse
  await supabase.from('password_resets').delete().eq('token', token);

  return new Response(
    JSON.stringify({ message: 'Password reset successful' }),
    { status: 200 }
  );
}
