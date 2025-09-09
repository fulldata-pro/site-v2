import { S3Client } from '@aws-sdk/client-s3';

// Validar que las configuraciones están disponibles
const validateAWSConfig = () => {
  
  const requiredVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY', 
    'AWS_S3_BUCKET_NAME'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing AWS configuration:', missing);
    throw new Error(`Missing AWS environment variables: ${missing.join(', ')}`);
  }
};

// Validar configuración antes de crear el cliente
try {
  validateAWSConfig();
} catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ [DESARROLLO] AWS validation failed, using mock service:', error);
  } else {
    throw error;
  }
}

export const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

export const AWS_CONFIG = {
  region: process.env.AWS_REGION || 'us-east-1',
  bucketName: process.env.AWS_S3_BUCKET_NAME!,
  cloudfrontDomain: process.env.AWS_CLOUDFRONT_DOMAIN || '',
} as const;