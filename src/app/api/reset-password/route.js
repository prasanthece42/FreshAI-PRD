import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // 1. Validate the token
    const { data: resetData, error: resetError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .single();

    if (resetError || !resetData) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // 2. Check if token is expired (add this if your table has `expires_at`)
    const now = new Date();
    if (new Date(resetData.expires_at) < now) {
      return NextResponse.json(
        { message: 'Token has expired' },
        { status: 400 }
      );
    }

    // 3. Hash the new password (use a proper library like `bcryptjs`)
    const hashedPassword = await hashPassword(password); // Implement this function

    // 4. Update the user's password
    const { error: userError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', resetData.user_id);

    if (userError) {
      return NextResponse.json(
        { message: 'Failed to update password' },
        { status: 500 }
      );
    }

    // 5. Delete the used token
    await supabase.from('password_resets').delete().eq('token', token);

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function (put this in a separate file like `lib/auth.js`)
async function hashPassword(password) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}