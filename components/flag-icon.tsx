'use client'

import Image from 'next/image'

interface FlagIconProps {
  countryCode: string
  size?: number
  className?: string
}

export function FlagIcon({ countryCode, size = 20, className = '' }: FlagIconProps) {
  const flagSrc = `/images/flags/1x1/${countryCode.toLowerCase()}.svg`
  
  return (
    <div 
      className={`flex items-center justify-center rounded-full overflow-hidden bg-gray-100 border border-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image 
        src={flagSrc}
        alt={`${countryCode} flag`}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  )
}