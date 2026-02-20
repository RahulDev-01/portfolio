import React, { useEffect, useRef } from 'react'
import useDeviceCapability from '../../hooks/useDeviceCapability'

const InteractiveBackground = ({ redMode = false }) => {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const sporesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef(null)
    const isVisibleRef = useRef(true)
    const { tier, reducedMotion } = useDeviceCapability()

    useEffect(() => {
        // On low tier or reduced motion, skip canvas animation entirely
        if (tier === 'low' || reducedMotion) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const particles = particlesRef.current
        const spores = sporesRef.current

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width
                this.y = y || Math.random() * canvas.height
                this.vx = (Math.random() - 0.5) * 1.5
                this.vy = (Math.random() - 0.5) * 1.5
                this.radius = Math.random() * 3 + 2
                const colors = redMode
                    ? ['#dc2626', '#b91c1c', '#991b1b', '#7f1d1d']
                    : ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899']
                this.color = colors[Math.floor(Math.random() * colors.length)]
                this.opacity = Math.random() * 0.5 + 0.4
            }

            update(mouse) {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1

                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 200) {
                    const force = (200 - distance) / 200
                    this.vx += (dx / distance) * force * 0.1
                    this.vy += (dy / distance) * force * 0.1
                }

                const maxSpeed = 2
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed
                    this.vy = (this.vy / speed) * maxSpeed
                }

                this.vx *= 0.99
                this.vy *= 0.99
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.globalAlpha = this.opacity
                ctx.fill()
                ctx.globalAlpha = 1
            }
        }

        // Floating air particle/spore class
        class FloatingSpore {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.vx = (Math.random() - 0.5) * 0.3
                this.vy = -Math.random() * 0.5 - 0.2
                this.radius = Math.random() * 2 + 0.5
                this.opacity = Math.random() * 0.3 + 0.1
                this.color = redMode ? '#dc2626' : '#8b5cf6'
            }

            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0) this.x = canvas.width
                if (this.x > canvas.width) this.x = 0
                if (this.y < 0) this.y = canvas.height
                if (this.y > canvas.height) this.y = 0
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.globalAlpha = this.opacity
                ctx.fill()
                ctx.globalAlpha = 1
            }
        }

        // Tier-based particle and spore limits
        const maxParticleMultiplier = tier === 'medium' ? 0.5 : 1
        const maxSporeMultiplier = tier === 'medium' ? 0.5 : 1

        particles.length = 0
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000 * maxParticleMultiplier)
        for (let i = 0; i < Math.min(particleCount, tier === 'medium' ? 25 : 50); i++) {
            particles.push(new Particle())
        }

        spores.length = 0
        const sporeCount = Math.floor((canvas.width * canvas.height) / 10000 * maxSporeMultiplier)
        for (let i = 0; i < Math.min(sporeCount, tier === 'medium' ? 40 : 100); i++) {
            spores.push(new FloatingSpore())
        }

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        // Click handler - add particles
        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const clickCount = tier === 'medium' ? 3 : 5
            for (let i = 0; i < clickCount; i++) {
                particles.push(new Particle(x, y))
            }
            const maxTotal = tier === 'medium' ? 60 : 150
            if (particles.length > maxTotal) {
                particles.splice(0, particles.length - maxTotal)
            }
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('click', handleClick)

        // IntersectionObserver to pause when off-screen
        const observer = new IntersectionObserver(
            ([entry]) => { isVisibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        // Throttle connection distance checks on medium
        const connectionDistance = tier === 'medium' ? 100 : 150

        // Animation loop
        const animate = () => {
            if (!isVisibleRef.current) {
                // Still schedule the next frame but skip work
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            spores.forEach(spore => {
                spore.update()
                spore.draw()
            })

            particles.forEach(particle => {
                particle.update(mouseRef.current)
                particle.draw()
            })

            // Draw connections
            ctx.strokeStyle = redMode ? '#dc2626' : '#8b5cf6'
            ctx.lineWidth = 1
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.globalAlpha = (1 - distance / connectionDistance) * 0.5
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
            ctx.globalAlpha = 1

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('click', handleClick)
            observer.disconnect()
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [redMode, tier, reducedMotion])

    // On low tier, render a static gradient fallback instead of canvas
    if (tier === 'low' || reducedMotion) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    background: redMode
                        ? 'radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(185,28,28,0.06) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }}
            />
        )
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'auto'
                }}
            />
        </>
    )
}

export default InteractiveBackground
