import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/services/database.service';

interface GoogleSignInData {
  email: string;
  name: string;
  image?: string;
  googleId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GoogleSignInData;
    const { email, name, image, googleId } = body;

    if (!email || !name || !googleId) {
      return NextResponse.json(
        { error: 'Datos de Google incompletos' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await db.users.findByEmail(email);
    
    if (user) {
      // User exists, return user data
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          uid: user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar || image,
        }
      });
    } else {
      // User doesn't exist, create new user
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Generate unique ID and UID
      const userCount = await db.users.count({});
      const newId = userCount + 1;
      const uid = `user-google-${new Date()}-${Math.random().toString(36).substring(2, 9)}`;

      // Create user with Google data
      const newUser = await db.users.create({
        id: newId,
        uid: uid,
        email,
        firstName,
        lastName,
        avatar: image,
        googleId: googleId,
        // No password for Google users
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Create default account for the user
      const account = await db.accounts.create({
        id: newId,
        uid: `account-${uid}`,
        name: name,
        email: email,
        type: 'individual',
        status: 'active',
        users: [{ user: newUser._id as any, role: 'owner', addedAt: new Date() }],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Update user with account reference
      await db.users.update(String(newUser._id), {
        accounts: [account._id]
      });

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          uid: newUser.uid,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          avatar: newUser.avatar,
        }
      });
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}