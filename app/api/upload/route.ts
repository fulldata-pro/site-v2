import { NextRequest, NextResponse } from 'next/server';
import { UploadService } from '@/services/upload-service';

// Force dynamic rendering to prevent build-time AWS config validation
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const type = (formData.get('type') as string) || 'document';

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

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let result;
    if (type === 'avatar') {
      // Validar archivo de imagen para avatares
      const validation = UploadService.validateImageFile(file);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }
      result = await UploadService.uploadAvatar(buffer, file.name, userId, file.type);
    } else {
      result = await UploadService.uploadDocument(buffer, file.name, userId, file.type);
    }

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
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: 'fileName es requerido' },
        { status: 400 }
      );
    }

    const result = await UploadService.deleteFile(fileName);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Archivo eliminado exitosamente',
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}