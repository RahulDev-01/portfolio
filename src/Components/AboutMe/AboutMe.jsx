import React, { useState, useEffect, useRef, memo } from 'react'
import { motion, useInView } from 'motion/react'

const AboutMe = memo(() => {
    const [counters, setCounters] = useState({ projects: 0, experience: 0, clients: 0 })
    const statsRef = useRef(null)
    const isStatsInView = useInView(statsRef, { once: true })

    // Animated counter effect
    useEffect(() => {
        if (isStatsInView) {
            const targets = { projects: 15, experience: 2, clients: 10 }
            const duration = 2000
            const steps = 60
            const interval = duration / steps

            let currentStep = 0
            const timer = setInterval(() => {
                currentStep++
                const progress = currentStep / steps

                setCounters({
                    projects: Math.floor(targets.projects * progress),
                    experience: Math.floor(targets.experience * progress),
                    clients: Math.floor(targets.clients * progress)
                })

                if (currentStep >= steps) {
                    setCounters(targets)
                    clearInterval(timer)
                }
            }, interval)

            return () => clearInterval(timer)
        }
    }, [isStatsInView])

    const timeline = [
        {
            year: '2023',
            title: 'Started Web Development Journey',
            description: 'Began learning HTML, CSS, and JavaScript. Built my first responsive websites.',
            icon: '🚀'
        },
        {
            year: '2024',
            title: 'Mastered React & Modern Frameworks',
            description: 'Dove deep into React, Next.js, and modern web technologies. Created interactive applications.',
            icon: '⚛️'
        },
        {
            year: 'Present',
            title: 'Full Stack Developer & Designer',
            description: 'Building stunning web applications with cutting-edge technologies and beautiful UI/UX.',
            icon: '✨'
        }
    ]

    const skills = [
        { name: 'React & Next.js', level: 90, color: 'from-blue-500 to-cyan-500' },
        { name: 'UI/UX Design', level: 95, color: 'from-purple-500 to-pink-500' },
        { name: 'JavaScript/TypeScript', level: 88, color: 'from-yellow-500 to-orange-500' },
        { name: 'Tailwind CSS', level: 100, color: 'from-teal-500 to-green-500' },
        { name: 'Node.js & APIs', level: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'Figma & Design Tools', level: 90, color: 'from-pink-500 to-rose-500' }
    ]

    const interests = [
        { icon: '💻', title: 'Coding', description: 'Building amazing web apps' },
        { icon: '🎨', title: 'Design', description: 'Creating beautiful UIs' },
        { icon: '📚', title: 'Learning', description: 'Always exploring new tech' },
        { icon: '🎮', title: 'Gaming', description: 'Relaxing with games' },
        { icon: '🎵', title: 'Music', description: 'Coding with good vibes' },
        { icon: '✈️', title: 'Travel', description: 'Exploring new places' }
    ]

    return (
        <div className="relative w-full bg-[#060010] text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                        Passionate developer crafting digital experiences that blend creativity with functionality
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 sm:mb-20"
                >
                    {[
                        { label: 'Projects Completed', value: counters.projects, suffix: '+', icon: '🎯' },
                        { label: 'Years Experience', value: counters.experience, suffix: '+', icon: '⏱️' },
                        { label: 'Happy Clients', value: counters.clients, suffix: '+', icon: '😊' }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="text-sm sm:text-base text-white/60">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 sm:mb-20"
                >
                    <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        My Journey
                    </h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex items-center mb-8 sm:mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10 ring-2 sm:ring-4 ring-[#060010]"></div>

                                {/* Content card */}
                                <div className={`w-full md:w-5/12 pl-10 sm:pl-16 md:pl-0 pr-4 sm:pr-6 ${index % 2 === 0 ? 'md:mr-auto md:pr-8 lg:pr-12' : 'md:ml-auto md:pl-8 lg:pl-12'
                                    }`}>
                                    <motion.div
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                        <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-6">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                                                <span className="text-xs sm:text-sm font-semibold text-cyan-400">{item.year}</span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{item.title}</h4>
                                            <p className="text-sm sm:text-base text-white/70">{item.description}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 sm:mb-20"
                >
                    <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Skills & Expertise
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-semibold text-white">{skill.name}</span>
                                        <span className="text-sm text-cyan-400">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                        ></motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interests Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Beyond Code
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {interests.map((interest, index) => (
                            <motion.div
                                key={interest.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 text-center">
                                    <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{interest.icon}</div>
                                    <h4 className="font-semibold text-sm sm:text-base mb-1">{interest.title}</h4>
                                    <p className="text-xs text-white/60 hidden sm:block">{interest.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
})

export default AboutMe
