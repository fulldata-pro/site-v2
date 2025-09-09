import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth.validation';
import { hashPassword } from '@/lib/auth/jwt';
import { db } from '@/lib/db/services/database.service';
import emailService from '@/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'El correo electrónico ya está registrado' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate unique ID and UID
    const userCount = await db.users.count({});
    const newId = userCount + 1;
    const uid = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Create user
    const user = await db.users.create({
      id: newId,
      uid: uid,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create default account for the user
    const account = await db.accounts.create({
      id: newId,
      uid: `account-${uid}`,
      name: `${firstName} ${lastName}`,
      email: email,
      type: 'individual',
      status: 'active',
      users: [{ user: user._id as any, role: 'owner', addedAt: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Update user with account reference
    await db.users.update(String(user._id), {
      accounts: [account._id]
    });

    // Send welcome email (don't wait for it)
    try {
      await emailService.sendWelcomeEmail(email, firstName);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't fail registration if email sending fails
    }

    return NextResponse.json({
      success: true,
      message: 'Cuenta creada exitosamente',
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}