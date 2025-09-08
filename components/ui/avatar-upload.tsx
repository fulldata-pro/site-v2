'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { UserIcon } from '@/components/icons/User-icon'
import { useAppDispatch } from '@/store/hooks'
import { updateProfile } from '@/store/slices/authSlice'

interface AvatarUploadProps {
  currentAvatar?: string
  onAvatarChange: (avatarUrl: string) => void
  userId: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export default function AvatarUpload({ 
  currentAvatar, 
  onAvatarChange, 
  userId, 
  className = '', 
  size = 'medium',
  disabled = false 
}: AvatarUploadProps) {
  const dispatch = useAppDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const iconSizes = {
    small: 'text-lg',
    medium: 'text-xl', 
    large: 'text-3xl'
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de archivo no válido. Solo se permiten JPG, PNG y WEBP.')
      return
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 5MB permitido.')
      return
    }

    setError('')
    
    // Mostrar preview local
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Subir archivo
    uploadAvatar(file)
  }

  const uploadAvatar = async (file: File) => {
    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al subir el avatar')
      }

      if (result.success && result.url) {
        setPreviewUrl(result.url)
        
        // Actualizar avatar del usuario en la base de datos
        try {
          const avatarUpdateResponse = await fetch('/api/user/avatar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ avatar: result.url }),
            credentials: 'include'
          });

          if (!avatarUpdateResponse.ok) {
            console.warn('No se pudo actualizar el avatar en la base de datos');
          }
        } catch (avatarError) {
          console.warn('Error actualizando avatar en BD:', avatarError);
        }
        
        // Actualizar el avatar en el estado global de Redux
        dispatch(updateProfile({ avatar: result.url }))
        onAvatarChange(result.url)
      } else {
        throw new Error('No se recibió la URL del avatar')
      }

    } catch (error) {
      console.error('Error uploading avatar:', error)
      setError(error instanceof Error ? error.message : 'Error al subir el avatar')
      // Restaurar preview anterior si hay error
      setPreviewUrl(currentAvatar || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    if (disabled || isUploading) return
    fileInputRef.current?.click()
  }

  const handleRemoveAvatar = async () => {
    if (disabled || isUploading) return
    
    setIsUploading(true)
    setError('')

    try {
      // Actualizar avatar en la base de datos a null
      const avatarUpdateResponse = await fetch('/api/user/avatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: null }),
        credentials: 'include'
      });

      if (!avatarUpdateResponse.ok) {
        throw new Error('Error al quitar el avatar');
      }

      // Actualizar el avatar en el estado global de Redux
      dispatch(updateProfile({ avatar: undefined }))
      setPreviewUrl(null)
      onAvatarChange('')
    } catch (error) {
      console.error('Error removing avatar:', error)
      setError('Error al quitar el avatar')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Avatar Display */}
        <div 
          className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer group transition-all duration-300 hover:shadow-xl ${
            disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
          onClick={handleClick}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500">
              <UserIcon className={`${iconSizes[size]} text-white`} />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs">{previewUrl ? 'Cambiar' : 'Subir'}</p>
            </div>
          </div>

          {/* Loading spinner */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClick}
            disabled={disabled || isUploading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isUploading ? 'Subiendo...' : previewUrl ? 'Cambiar' : 'Subir'}
          </button>
          
          {previewUrl && (
            <button
              onClick={handleRemoveAvatar}
              disabled={disabled || isUploading}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-lg hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300/50 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Quitar
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm max-w-xs text-center">
            {error}
          </div>
        )}

        {/* File input (hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isUploading}
        />

        {/* Helper text */}
        <p className="text-xs text-gray-500 text-center max-w-xs">
          JPG, PNG o WEBP. Máximo 5MB.
        </p>
      </div>
    </div>
  )
}