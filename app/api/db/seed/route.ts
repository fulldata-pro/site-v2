import { NextResponse } from 'next/server';
import { db } from '@/lib/db/services/database.service';

export async function POST() {
  try {
    await db.seed();
    
    return NextResponse.json({ 
      success: true,
      message: 'Database seeded successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}