import { NextRequest, NextResponse } from 'next/server';
import { UploadService } from '@/services/upload-service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se encontró archivo' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'ID de usuario requerido' },
        { status: 400 }
      );
    }

    // Validar archivo de imagen
    const validation = UploadService.validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir avatar
    const result = await UploadService.uploadAvatar(
      buffer,
      file.name,
      userId,
      file.type
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
    });

  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const fileName = searchParams.get('fileName');

    if (!userId || !fileName) {
      return NextResponse.json(
        { success: false, error: 'userId y fileName son requeridos' },
        { status: 400 }
      );
    }

    // Generar URL presigned para subida directa
    const result = await UploadService.getPresignedUploadUrl(
      fileName,
      userId,
      'avatar'
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      uploadUrl: result.uploadUrl,
      fileUrl: result.fileUrl,
    });

  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}