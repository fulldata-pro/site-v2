import { NextRequest, NextResponse } from 'next/server';
import { changePasswordSchema, setPasswordSchema } from '@/lib/validations/auth.validation';
import { verifyToken, comparePassword, hashPassword } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';
import emailService from '@/services/emailService';

export async function PUT(request: NextRequest) {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('authToken')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticación requerido' },
        { status: 401 }
      );
    }

    // Verify token
    let payload;
    try {
      payload = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Find user
    const user = await db.users.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Check if user has a password (Google users don't have passwords)
    const isGoogleUser = !user.password && user.googleId;

    // Validate input based on user type
    let validationResult;
    if (isGoogleUser) {
      // Google users only need new password and confirmation
      validationResult = setPasswordSchema.safeParse(body);
    } else {
      // Regular users need current password validation
      validationResult = changePasswordSchema.safeParse(body);
    }

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // For regular users, verify current password
    if (!isGoogleUser && 'currentPassword' in data) {
      const isCurrentPasswordValid = await comparePassword(data.currentPassword as string, user.password!);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Contraseña actual incorrecta' },
          { status: 400 }
        );
      }
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(data.newPassword);

    // Update user password
    await db.users.update(payload.userId, {
      password: hashedNewPassword,
      updatedAt: new Date()
    });

    // Send notification email (don't wait for it)
    try {
      await emailService.sendPasswordChangeNotification(user.email, user.firstName);
    } catch (error) {
      console.error('Failed to send password change notification:', error);
      // Don't fail the password change if email sending fails
    }

    return NextResponse.json({
      success: true,
      message: isGoogleUser ? 
        'Contraseña establecida exitosamente' : 
        'Contraseña cambiada exitosamente'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}