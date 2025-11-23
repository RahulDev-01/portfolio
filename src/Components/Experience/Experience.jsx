import React, { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const Experience = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [hoveredSkill, setHoveredSkill] = useState(null)

    const skills = [
        { name: 'React', icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
        { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-400' },
        { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-400' },
        { name: 'Full Stack', icon: '🚀', color: 'from-purple-400 to-pink-400' }
    ]

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

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent break-words leading-tight">
                        Experience
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
                        Professional certification and achievements
                    </p>
                </motion.div>

                {/* Certificate Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group "
                >
                    {/* Animated glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Main certificate card */}
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center ">
                            {/* Left side - Certificate Image */}
                            <div className="lg:col-span-5 flex flex-col items-center gap-4 sm:gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative w-full"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 " />

                                    {/* Certificate Image */}
                                    <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl ">
                                        <img
                                            src="/certificate.png"
                                            alt="Internship Certificate"
                                            className="w-full h-auto object-cover "
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right side - Certificate details */}
                            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent break-words leading-tight px-2 lg:px-0"
                                >
                                    Certificate of Internship
                                </motion.h3>

                                {/* Role */}
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="text-base sm:text-lg md:text-xl font-semibold text-white break-words px-2 lg:px-0"
                                >
                                    Full Stack Web Development Intern
                                </motion.p>

                                {/* Company */}
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="text-sm sm:text-base md:text-lg text-cyan-400 break-words px-2 lg:px-0"
                                >
                                    Unified Mentor Pvt Ltd
                                </motion.p>

                                {/* Details grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                                    >
                                        <p className="text-xs text-white/60 mb-1">Duration</p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">15/07/2025 - 15/10/2025</p>
                                        <p className="text-xs text-cyan-400 mt-1">3 Months</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                                    >
                                        <p className="text-xs text-white/60 mb-1">Issued Date</p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">15/10/2025</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all sm:col-span-2"
                                    >
                                        <p className="text-xs text-white/60 mb-1">Certificate ID</p>
                                        <p className="text-xs font-mono text-cyan-400 break-all">U85500HR2023PTC115118</p>
                                    </motion.div>
                                </motion.div>

                                {/* Skills Section */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <p className="text-xs sm:text-sm text-white/60 mb-3">Technologies & Skills</p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                                        {skills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                whileHover={{ scale: 1.05, y: -3 }}
                                                onHoverStart={() => setHoveredSkill(index)}
                                                onHoverEnd={() => setHoveredSkill(null)}
                                                className="relative group cursor-pointer"
                                            >
                                                {hoveredSkill === index && (
                                                    <motion.div
                                                        layoutId="skillGlow"
                                                        className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-lg sm:rounded-xl blur-sm opacity-75`}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                                <div className="relative px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 hover:bg-white/10 transition-colors">
                                                    <span className="text-base sm:text-lg">{skill.icon}</span>
                                                    <span className="text-xs sm:text-sm font-medium text-white">{skill.name}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 1 }}
                                    className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed"
                                >
                                    Successfully completed a comprehensive three-month internship program, demonstrating consistent hard work and dedication throughout. Gained hands-on experience in full-stack web development technologies and best practices.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Experience
