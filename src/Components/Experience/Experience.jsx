import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'

const Experience = () => {
    const [activeCard, setActiveCard] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    // Auto-cycle through cards
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    const experiences = [
        {
            company: 'Unified Mentor Pvt Ltd',
            role: 'Full Stack Web Development Intern',
            duration: '15/07/2025 - 15/10/2025',
            period: '3 Months',
            description: 'Successfully completed a comprehensive internship program focused on full-stack web development. Demonstrated consistent hard work and dedication throughout the program.',
            icon: '💼',
            color: 'from-blue-500 to-cyan-500',
            skills: ['React', 'Node.js', 'JavaScript', 'Full Stack Development']
        },
        {
            company: 'Web Development',
            role: 'Frontend Specialist',
            duration: '2024 - Present',
            period: 'Ongoing',
            description: 'Building modern, responsive web applications with cutting-edge technologies. Specializing in React, Next.js, and creating stunning user interfaces.',
            icon: '⚛️',
            color: 'from-purple-500 to-pink-500',
            skills: ['React', 'Next.js', 'Tailwind CSS', 'UI/UX Design']
        },
        {
            company: 'Freelance Projects',
            role: 'Full Stack Developer',
            duration: '2023 - Present',
            period: '2+ Years',
            description: 'Delivered multiple successful projects for clients worldwide. Focused on creating high-quality, scalable web applications with exceptional user experiences.',
            icon: '🚀',
            color: 'from-orange-500 to-red-500',
            skills: ['JavaScript', 'TypeScript', 'API Development', 'Database Design']
        }
    ]

    const certificationDetails = {
        issuedDate: '15/10/2025',
        certificateId: 'U85500HR2023PTC115118',
        verifyUrl: '#',
        director: 'Paras Grover',
        awardedBy: 'Sanket Patil'
    }

    return (
        <div ref={sectionRef} className="relative w-full bg-[#060010] text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            {/* Animated imaging background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large floating orbs with gradient */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -40, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/20 via-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.25, 0.45, 0.25],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
                />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Experience
                    </h2>
                    <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                        My professional journey in web development and technology
                    </p>
                </motion.div>

                {/* Experience Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            onHoverStart={() => setActiveCard(index)}
                            whileHover={{ scale: 1.03, y: -10 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                            {/* Card content */}
                            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 h-full transition-all duration-300">
                                {/* Icon */}
                                <div className="text-5xl mb-4">{exp.icon}</div>

                                {/* Company & Role */}
                                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                    {exp.company}
                                </h3>
                                <p className="text-lg font-semibold text-cyan-400 mb-2">{exp.role}</p>

                                {/* Duration */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm text-white/60">{exp.duration}</span>
                                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-white/70 mb-4 leading-relaxed">
                                    {exp.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 hover:bg-white/10 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Active indicator */}
                                {activeCard === index && (
                                    <motion.div
                                        layoutId="activeCard"
                                        className={`absolute -inset-0.5 bg-gradient-to-r ${exp.color} rounded-2xl -z-10`}
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certification Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative group"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Certificate card */}
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Left side - Certificate icon */}
                            <div className="flex-shrink-0">
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-6xl shadow-2xl"
                                >
                                    🏆
                                </motion.div>
                            </div>

                            {/* Right side - Certificate details */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Certified Full Stack Developer
                                </h3>
                                <p className="text-white/80 mb-4 text-lg">
                                    Successfully completed internship at <span className="font-semibold text-white">Unified Mentor Pvt Ltd</span>
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <p className="text-xs text-white/60 mb-1">Issued Date</p>
                                        <p className="text-sm font-semibold text-white">{certificationDetails.issuedDate}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <p className="text-xs text-white/60 mb-1">Certificate ID</p>
                                        <p className="text-xs font-mono text-cyan-400">{certificationDetails.certificateId}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                                    <div className="flex items-center gap-2 text-sm text-white/70">
                                        <span>✍️ Director: {certificationDetails.director}</span>
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full" />
                                    <div className="flex items-center gap-2 text-sm text-white/70">
                                        <span>🎖️ Awarded by: {certificationDetails.awardedBy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ISO Certification badge */}
                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <span className="text-xs font-bold text-white">ISO</span>
                            </div>
                            <p className="text-sm text-white/60">
                                AN ISO 9001:2015 Certified Company
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: 'Months Experience', value: '3+', icon: '📅' },
                        { label: 'Projects Completed', value: '15+', icon: '✅' },
                        { label: 'Technologies', value: '10+', icon: '⚡' },
                        { label: 'Certifications', value: '1', icon: '🎓' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Experience
