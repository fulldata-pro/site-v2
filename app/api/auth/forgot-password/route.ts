import { NextRequest, NextResponse } from 'next/server';
import { forgotPasswordSchema } from '@/lib/validations/auth.validation';
import { db } from '@/lib/db/services/database.service';
import emailService from '@/services/emailService';
import crypto from 'crypto';
import { resetTokens, cleanupExpiredTokens } from '@/lib/auth/reset-tokens';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Check if user exists
    const user = await db.users.findByEmail(email);
    if (!user) {
      // For security, don't reveal if email exists or not
      return NextResponse.json({
        success: true,
        message: 'Si el correo existe, se ha enviado un enlace de recuperación',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour

    // Store reset token
    resetTokens.set(resetToken, { email, expiresAt });

    // Clean up expired tokens
    cleanupExpiredTokens();

    // Send reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      return NextResponse.json(
        { error: 'Error al enviar correo de recuperación' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Se ha enviado un correo de recuperación',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}