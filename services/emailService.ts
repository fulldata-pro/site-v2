import sgMail from '@sendgrid/mail'

class EmailService {
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    
    const apiKey = process.env.SENDGRID_API_KEY
    if (apiKey && !this.isDevelopment) {
      sgMail.setApiKey(apiKey)
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
    
    if (this.isDevelopment) {
      console.log('\n🔧 [DESARROLLO] Email de recuperación de contraseña NO enviado')
      console.log('📧 Para:', email)
      console.log('🔗 URL de recuperación:', resetUrl)
      console.log('🚀 En producción se enviaría el email real\n')
      return
    }

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@fulldata.com',
      subject: 'Recuperar Contraseña - Fulldata',
      text: `
        Hola,
        
        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Fulldata.
        
        Para restablecer tu contraseña, haz clic en el siguiente enlace:
        ${resetUrl}
        
        Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
        
        Este enlace expirará en 1 hora por motivos de seguridad.
        
        Saludos,
        Equipo Fulldata
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperar Contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #192440; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">Fulldata</h1>
            <p style="margin: 10px 0 0 0; color: #ccc;">Sistema de Búsqueda de Información</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #192440; margin-top: 0;">Recuperar Contraseña</h2>
            
            <p>Hola,</p>
            
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Fulldata.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #eb1034; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            
            <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p style="word-break: break-all; background-color: #e9e9e9; padding: 10px; border-radius: 4px; font-family: monospace;">
              ${resetUrl}
            </p>
            
            <p><strong>Importante:</strong> Este enlace expirará en 1 hora por motivos de seguridad.</p>
            
            <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              Saludos,<br>
              Equipo Fulldata
            </p>
          </div>
        </body>
        </html>
      `
    }

    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error('Error sending email:', error)
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`)
      }
      throw new Error('Failed to send email')
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    if (this.isDevelopment) {
      console.log('\n🔧 [DESARROLLO] Email de bienvenida NO enviado')
      console.log('📧 Para:', email)
      console.log('👤 Nombre:', firstName)
      console.log('💌 Mensaje: ¡Bienvenido a Fulldata!')
      console.log('🚀 En producción se enviaría el email real\n')
      return
    }

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@fulldata.com',
      subject: 'Bienvenido a Fulldata',
      text: `
        Hola ${firstName},
        
        ¡Bienvenido a Fulldata!
        
        Tu cuenta ha sido creada exitosamente. Ahora puedes acceder a nuestro sistema de búsqueda de información.
        
        Para iniciar sesión, visita: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login
        
        Si tienes alguna pregunta, no dudes en contactarnos.
        
        Saludos,
        Equipo Fulldata
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Fulldata</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #192440; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">Fulldata</h1>
            <p style="margin: 10px 0 0 0; color: #ccc;">Sistema de Búsqueda de Información</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #192440; margin-top: 0;">¡Bienvenido!</h2>
            
            <p>Hola <strong>${firstName}</strong>,</p>
            
            <p>¡Bienvenido a Fulldata!</p>
            
            <p>Tu cuenta ha sido creada exitosamente. Ahora puedes acceder a nuestro sistema de búsqueda de información.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login" 
                 style="background-color: #eb1034; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Iniciar Sesión
              </a>
            </div>
            
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              Saludos,<br>
              Equipo Fulldata
            </p>
          </div>
        </body>
        </html>
      `
    }

    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error('Error sending welcome email:', error)
      // Don't throw error for welcome email as it's not critical
    }
  }
}

export default new EmailService()