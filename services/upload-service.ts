import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, AWS_CONFIG } from './aws-config';

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface PresignedUrlResponse {
  success: boolean;
  uploadUrl?: string;
  fileUrl?: string;
  error?: string;
}


export class UploadService {
  private static getEnvironmentPrefix(): string {
    // Usar variable específica o NODE_ENV
    const env = process.env.UPLOAD_ENV || process.env.NODE_ENV || 'development';
    return env === 'production' ? '' : 'develop/';
  }

  private static generateFileName(originalName: string, userId: string, type: 'avatar' | 'document'): string {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    const envPrefix = this.getEnvironmentPrefix();
    return `${envPrefix}${type}s/${userId}/${timestamp}.${extension}`;
  }

  static async uploadFile(file: Buffer, fileName: string, contentType: string): Promise<UploadResponse> {
    // Validar que tenemos s3Client
    if (!s3Client) {
      return {
        success: false,
        error: 'Cliente S3 no configurado correctamente'
      };
    }

    try {

      const command = new PutObjectCommand({
        Bucket: AWS_CONFIG.bucketName,
        Key: fileName,
        Body: file,
        ContentType: contentType,
        // ACL removido - usar política de bucket para acceso público
      });

      await s3Client.send(command);

      const fileUrl = AWS_CONFIG.cloudfrontDomain 
        ? `https://${AWS_CONFIG.cloudfrontDomain}/${fileName}`
        : `https://${AWS_CONFIG.bucketName}.s3.${AWS_CONFIG.region}.amazonaws.com/${fileName}`;

      return {
        success: true,
        url: fileUrl,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Mensaje de error más específico
      let errorMessage = 'Error desconocido al subir archivo';
      
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        
        if (error.message.includes('signature')) {
          errorMessage = 'Error de autenticación con AWS. Verifica las credenciales.';
        } else if (error.message.includes('bucket')) {
          errorMessage = 'Error con el bucket de S3. Verifica la configuración.';
        } else if (error.message.includes('region')) {
          errorMessage = 'Error de región de AWS. Verifica la configuración.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  static async uploadAvatar(file: Buffer, originalName: string, userId: string, contentType: string): Promise<UploadResponse> {
    const fileName = this.generateFileName(originalName, userId, 'avatar');
    return this.uploadFile(file, fileName, contentType);
  }

  static async uploadDocument(file: Buffer, originalName: string, userId: string, contentType: string): Promise<UploadResponse> {
    const fileName = this.generateFileName(originalName, userId, 'document');
    return this.uploadFile(file, fileName, contentType);
  }

  static async getPresignedUploadUrl(originalName: string, userId: string, type: 'avatar' | 'document' = 'document'): Promise<PresignedUrlResponse> {
    if (!s3Client) {
      return {
        success: false,
        error: 'Cliente S3 no configurado correctamente'
      };
    }

    try {
      const fileName = this.generateFileName(originalName, userId, type);
      
      const command = new PutObjectCommand({
        Bucket: AWS_CONFIG.bucketName,
        Key: fileName,
        // ACL removido - usar política de bucket para acceso público
      });

      const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

      const fileUrl = AWS_CONFIG.cloudfrontDomain 
        ? `https://${AWS_CONFIG.cloudfrontDomain}/${fileName}`
        : `https://${AWS_CONFIG.bucketName}.s3.${AWS_CONFIG.region}.amazonaws.com/${fileName}`;

      return {
        success: true,
        uploadUrl,
        fileUrl,
      };
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  static async deleteFile(fileName: string): Promise<{ success: boolean; error?: string }> {
    if (!s3Client) {
      return {
        success: false,
        error: 'Cliente S3 no configurado correctamente'
      };
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: AWS_CONFIG.bucketName,
        Key: fileName,
      });

      await s3Client.send(command);

      return { success: true };
    } catch (error) {
      console.error('Error deleting file:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  static validateFileSize(file: File, maxSizeInMB: number): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }

  static validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5; // 5MB

    if (!this.validateFileType(file, allowedTypes)) {
      return {
        valid: false,
        error: 'Tipo de archivo no válido. Solo se permiten JPG, PNG y WEBP.',
      };
    }

    if (!this.validateFileSize(file, maxSize)) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Máximo 5MB permitido.',
      };
    }

    return { valid: true };
  }
}