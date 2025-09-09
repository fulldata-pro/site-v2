import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token no encontrado' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    
    // Get user from database
    const user = await db.users.findById(payload.userId);
    
    if (!user || user.deletedAt) {
      return NextResponse.json(
        { error: 'Usuario no encontrado o desactivado' },
        { status: 404 }
      );
    }

    // Get user with accounts
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

    return NextResponse.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Token inválido o expirado' },
      { status: 401 }
    );
  }
}