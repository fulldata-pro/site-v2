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

  async sendPasswordChangeNotification(email: string, firstName: string): Promise<void> {
    if (this.isDevelopment) {
      console.log('\n🔧 [DESARROLLO] Email de notificación de cambio de contraseña NO enviado')
      console.log('📧 Para:', email)
      console.log('👤 Nombre:', firstName)
      console.log('🔐 Mensaje: Tu contraseña ha sido cambiada exitosamente')
      console.log('🚀 En producción se enviaría el email real\n')
      return
    }

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@fulldata.com',
      subject: 'Contraseña Cambiada - Fulldata',
      text: `
        Hola ${firstName},
        
        Te confirmamos que tu contraseña ha sido cambiada exitosamente en tu cuenta de Fulldata.
        
        Si no realizaste este cambio, por favor contacta a nuestro equipo de soporte inmediatamente.
        
        Detalles del cambio:
        - Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}
        - IP: (No disponible en este momento)
        
        Por tu seguridad, te recomendamos:
        • Cerrar todas las sesiones activas en otros dispositivos
        • Revisar tu actividad de cuenta reciente
        • Contactar soporte si no realizaste este cambio
        
        Saludos,
        Equipo de Seguridad Fulldata
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contraseña Cambiada - Fulldata</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #192440; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">Fulldata</h1>
            <p style="margin: 10px 0 0 0; color: #ccc;">Notificación de Seguridad</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #192440; margin-top: 0;">🔐 Contraseña Cambiada</h2>
            
            <p>Hola <strong>${firstName}</strong>,</p>
            
            <div style="background-color: #d4f7dc; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;"><strong>✅ Tu contraseña ha sido cambiada exitosamente</strong></p>
            </div>
            
            <p>Te confirmamos que tu contraseña ha sido actualizada en tu cuenta de Fulldata.</p>
            
            <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #991b1b;"><strong>⚠️ Si no realizaste este cambio, contacta a soporte inmediatamente</strong></p>
            </div>
            
            <h3 style="color: #192440;">Detalles del cambio:</h3>
            <ul style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 15px 0;">
              <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}</li>
              <li><strong>Dispositivo:</strong> Navegador web</li>
            </ul>
            
            <h3 style="color: #192440;">Recomendaciones de seguridad:</h3>
            <ul style="color: #374151;">
              <li>🔐 Cerrar todas las sesiones activas en otros dispositivos</li>
              <li>👀 Revisar tu actividad de cuenta reciente</li>
              <li>📞 Contactar soporte si no realizaste este cambio</li>
              <li>🔒 Mantener tu contraseña segura y privada</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" 
                 style="background-color: #192440; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Ir a Mi Cuenta
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px;">
              <strong>Equipo de Seguridad Fulldata</strong><br>
              Si tienes alguna pregunta sobre la seguridad de tu cuenta, no dudes en contactarnos.
            </p>
          </div>
        </body>
        </html>
      `
    }

    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error('Error sending password change notification:', error)
      // Don't throw error for notification email as it's not critical
    }
  }
}

export default new EmailService()