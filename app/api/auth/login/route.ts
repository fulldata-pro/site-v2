import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth.validation';
import { comparePassword, generateToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await db.users.findByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Check if user has a password (Google users don't have passwords)
    if (!user.password) {
      return NextResponse.json(
        { error: 'Esta cuenta fue creada con Google. Por favor, usa "Continuar con Google"' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Check if user has been deleted
    if (user.deletedAt) {
      return NextResponse.json(
        { error: 'Cuenta desactivada' },
        { status: 403 }
      );
    }

    // Update last login
    await db.users.updateLastLogin(String(user._id));

    // Generate JWT token
    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Get user accounts
    const userWithAccounts = await db.users.findWithAccounts(String(user._id));
    
    // Prepare user response (without sensitive data)
    const userResponse = {
      id: user.id,
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      phone: user.phone,
      phonePrefix: user.phonePrefix,
      accounts: userWithAccounts?.accounts || []
    };

    // Set cookie with token
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      token
    });

    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}