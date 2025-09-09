'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particles array
    const particles: Particle[] = []
    const particleCount = 50

    // Colors matching the brand palette
    const colors = [
      'rgba(235, 16, 52, 0.3)',   // primary red
      'rgba(25, 36, 64, 0.3)',    // secondary blue
      'rgba(255, 255, 255, 0.2)', // white
      'rgba(235, 16, 52, 0.1)',   // lighter red
      'rgba(25, 36, 64, 0.1)',    // lighter blue
    ]

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Subtle pulsing effect
        particle.opacity = 0.1 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`)
        ctx.fill()
      })

      // Draw connecting lines
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Floating geometric shapes
      const time = Date.now() * 0.001
      
      // Floating circles
      ctx.save()
      ctx.globalAlpha = 0.1
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time * 0.3 + i) * 50 + canvas.width * 0.2 + i * 60
        const y = Math.cos(time * 0.2 + i) * 30 + canvas.height * 0.3 + i * 80
        const size = 20 + Math.sin(time + i) * 5
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? '#eb1034' : '#192440'
        ctx.fill()
      }
      ctx.restore()

      // Floating rectangles
      ctx.save()
      ctx.globalAlpha = 0.05
      for (let i = 0; i < 3; i++) {
        ctx.save()
        const x = canvas.width * 0.7 + Math.sin(time * 0.4 + i * 2) * 40
        const y = canvas.height * 0.2 + i * 120 + Math.cos(time * 0.3 + i) * 20
        
        ctx.translate(x, y)
        ctx.rotate(time * 0.2 + i)
        
        ctx.fillStyle = i % 2 === 0 ? '#eb1034' : '#192440'
        ctx.fillRect(-15, -15, 30, 30)
        ctx.restore()
      }
      ctx.restore()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}