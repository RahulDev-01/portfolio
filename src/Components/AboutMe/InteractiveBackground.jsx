import React, { useEffect, useRef } from 'react'

const InteractiveBackground = ({ redMode = false }) => {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const particles = particlesRef.current

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
                // Move particle
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1

                // Mouse interaction - attract to cursor
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 200) {
                    const force = (200 - distance) / 200
                    this.vx += (dx / distance) * force * 0.1
                    this.vy += (dy / distance) * force * 0.1
                }

                // Limit velocity
                const maxSpeed = 2
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed
                    this.vy = (this.vy / speed) * maxSpeed
                }

                // Slowly return to normal speed
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

        // Initialize particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000)
        for (let i = 0; i < Math.min(particleCount, 100); i++) {
            particles.push(new Particle())
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
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle(x, y))
            }
            // Limit total particles
            if (particles.length > 150) {
                particles.splice(0, particles.length - 150)
            }
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('click', handleClick)

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
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

                    if (distance < 150) {
                        ctx.globalAlpha = (1 - distance / 150) * 0.5
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

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('click', handleClick)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return (
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
    )
}

export default InteractiveBackground
