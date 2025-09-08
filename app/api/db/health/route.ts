import { NextResponse } from 'next/server';
import { db } from '@/lib/db/services/database.service';

export async function GET() {
  try {
    const health = await db.healthCheck();
    
    return NextResponse.json(health, {
      status: health.connected ? 200 : 503
    });
  } catch (error) {
    return NextResponse.json(
      { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 503 }
    );
  }
}