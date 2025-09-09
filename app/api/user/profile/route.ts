import { NextRequest, NextResponse } from 'next/server';
import { updateProfileSchema } from '@/lib/validations/auth.validation';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';

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
    
    // Validate input
    const validationResult = updateProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, phone, phonePrefix, avatar } = validationResult.data;

    // Update user profile
    const updatedUser = await db.users.update(payload.userId, {
      firstName,
      lastName,
      phone,
      phonePrefix,
      ...(avatar !== undefined && { avatar }),
      updatedAt: new Date()
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Return updated user data (without sensitive information)
    const userResponse = {
      id: updatedUser.id,
      uid: updatedUser.uid,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone,
      phonePrefix: updatedUser.phonePrefix
    };

    return NextResponse.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      user: userResponse
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}