import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/lib/validations/auth.validation';
import { hashPassword } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';
import { resetTokens } from '@/lib/auth/token-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { token, password } = validationResult.data;

    // Check if token exists
    const tokenData = resetTokens.get(token);
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Token de recuperación inválido o expirado' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (tokenData.expiresAt < Date.now()) {
      resetTokens.delete(token);
      return NextResponse.json(
        { error: 'Token de recuperación expirado' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.users.findByEmail(tokenData.email);
    if (!user) {
      resetTokens.delete(token);
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    await db.users.update(String(user._id), {
      password: hashedPassword,
      updatedAt: new Date()
    });

    // Delete used token
    resetTokens.delete(token);

    return NextResponse.json({
      success: true,
      message: 'Contraseña restablecida exitosamente',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}