import React, { useState, useEffect, useRef, memo } from 'react'
import { motion, useInView } from 'motion/react'
import InteractiveBackground from './InteractiveBackground'
import { useUpsideDown } from '../../contexts/UpsideDownContext'
import FloatingParticles from '../ui/FloatingParticles'
import StrangerVines from '../ui/StrangerVines'

const AboutMe = memo(() => {
    const { isUpsideDown } = useUpsideDown()
    const [counters, setCounters] = useState({ projects: 0, experience: 0, clients: 0 })
    const [activeInterestIndex, setActiveInterestIndex] = useState(0)
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

    // Auto-hover effect for interests - cycles every 2 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveInterestIndex((prev) => (prev + 1) % 6)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

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
        <div className={`relative w-full text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden transition-colors duration-700 ${isUpsideDown ? 'bg-gradient-to-b from-red-950 via-black to-red-950' : 'bg-[#060010]'
            }`}>
            {/* Interactive Particle Background */}
            <div className="absolute inset-0 overflow-hidden">
                <InteractiveBackground redMode={isUpsideDown} />
            </div>



            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent ${isUpsideDown
                        ? 'bg-gradient-to-r from-red-500 via-red-400 to-red-600'
                        : 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400'
                        }`}
                        style={isUpsideDown ? {
                            textShadow: '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(139, 0, 0, 0.3)',
                            animation: 'flicker 3s infinite'
                        } : {}}>
                        {isUpsideDown ? 'WHO AM I IN THE UPSIDE DOWN' : 'About Me'}
                    </h2>
                    <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${isUpsideDown ? 'text-red-300/70' : 'text-white/70'
                        }`}>
                        {isUpsideDown
                            ? 'Surviving in the darkness... navigating the shadow realm since 2023'
                            : 'Passionate developer crafting digital experiences that blend creativity with functionality'
                        }
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 sm:mb-20"
                >
                    {(isUpsideDown ? [
                        { label: 'Crawls Completed ', value: counters.projects, suffix: '+', icon: '💀' },
                        { label: 'Killed Demogorons', value: counters.experience, suffix: '+', icon: '⚰️' },
                        { label: 'Portals Opened', value: 'Countless', suffix: '', icon: '🕷️', className: 'text-red-400' }
                    ] : [
                        { label: 'Projects Completed', value: counters.projects, suffix: '+', icon: '🎯' },
                        { label: 'Years Experience', value: counters.experience, suffix: '+', icon: '⏱️' },
                        { label: 'Learning Devops ', value: 'Currently ', suffix: '', icon: '😊', className: 'text-blue-400' }
                    ]).map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            {/* Full Tentacle Frame on OUTSIDE of box - only in Upside Down mode */}
                            {isUpsideDown && (
                                <div className="absolute -inset-16 pointer-events-none z-30 rounded-lg overflow-hidden"
                                    style={{
                                        backgroundImage: 'url(/stats_horror_frame.png)',
                                        scale: 1,
                                        backgroundSize: '98% 90%',
                                        backgroundRepeat: 'no-repeat',
                                        filter: 'drop-shadow(0 0 15px rgba(220,38,38,0.8))',
                                        opacity: .6
                                    }}
                                />
                            )}
                            <div className={`absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 ${isUpsideDown ? 'rounded-lg bg-gradient-to-r from-red-900 via-red-800 to-red-900' : 'rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500'}`}></div>
                            <div className={`relative backdrop-blur-lg p-6 sm:p-8 text-center overflow-hidden ${isUpsideDown ? 'rounded-lg bg-black/50 border border-red-900/50' : 'rounded-3xl bg-white/5 border border-white/10'}`}>
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className={`text-2xl sm:text-3xl font-bold mb-2 px-2 min-h-[3rem] flex items-center justify-center whitespace-normal break-words ${typeof stat.value === 'number'
                                    ? isUpsideDown
                                        ? 'bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent'
                                        : 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
                                    : (stat.className || 'text-white')
                                    }`}
                                    style={isUpsideDown ? { animation: 'flicker 2s infinite' } : {}}>
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className={`text-sm sm:text-base ${isUpsideDown ? 'text-red-300/60' : 'text-white/60'}`}>{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 sm:mb-20"
                >
                    <h3 className={`text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent ${isUpsideDown
                        ? 'bg-gradient-to-r from-red-400 to-red-600'
                        : 'bg-gradient-to-r from-purple-400 to-pink-400'
                        }`}>
                        {isUpsideDown ? 'THE CORRUPTION TIMELINE' : 'My Journey'}
                    </h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className={`absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${isUpsideDown
                            ? 'bg-gradient-to-b from-red-900 via-red-600 to-red-900'
                            : 'bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500'
                            }`}></div>

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex items-center mb-8 sm:mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full transform -translate-x-1/2 z-10 ring-2 sm:ring-4 ${isUpsideDown
                                    ? 'bg-gradient-to-r from-red-600 to-red-800 ring-black'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 ring-[#060010]'
                                    }`}></div>

                                {/* Content card */}
                                <div className={`w-full md:w-5/12 pl-10 sm:pl-16 md:pl-0 pr-4 sm:pr-6 ${index % 2 === 0 ? 'md:mr-auto md:pr-8 lg:pr-12' : 'md:ml-auto md:pl-8 lg:pl-12'
                                    }`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="relative group"
                                    >
                                        {/* Full Tentacle Frame on OUTSIDE of box - only in Upside Down mode */}
                                        {isUpsideDown && (
                                            <div className="absolute -inset-8 pointer-events-none z-30 rounded-lg overflow-hidden"
                                                style={{
                                                    backgroundImage: 'url(/timeline_tentacle_frame.png?v=2)',
                                                    backgroundSize: '90% 90%',
                                                    backgroundPosition: 'center',
                                                    scale: '1.1',
                                                    height: '350px',
                                                    margin: 'auto',
                                                    padding: 'auto',
                                                    backgroundRepeat: 'no-repeat',
                                                    filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.5))',
                                                    opacity: 0.6
                                                }}
                                            />
                                        )}
                                        <div className={`absolute inset-0 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${isUpsideDown ? 'rounded-lg bg-gradient-to-r from-red-900 via-red-800 to-red-900' : 'rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500'}`}></div>
                                        <div className={`relative backdrop-blur-lg p-4 sm:p-6 overflow-hidden ${isUpsideDown ? 'rounded-lg bg-black/50 border border-red-900/50' : 'rounded-2xl bg-white/5 border border-white/10'}`}>
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                <span className="text-2xl sm:text-3xl">{isUpsideDown ? (index === 0 ? '🦑' : index === 1 ? '👁️' : '🔥') : item.icon}</span>
                                                <span className={`text-xs sm:text-sm font-semibold ${isUpsideDown ? 'text-red-400' : 'text-cyan-400'}`}>{item.year}</span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{item.title}</h4>
                                            <p className={`text-sm sm:text-base ${isUpsideDown ? 'text-red-300/70' : 'text-white/70'}`}>{item.description}</p>
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
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 sm:mb-20"
                >
                    <h3 className={`text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent ${isUpsideDown
                        ? 'bg-gradient-to-r from-red-400 to-red-600'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                        }`}>
                        {isUpsideDown ? 'POWERS UNLOCKED' : 'Skills & Expertise'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="relative group"
                            >
                                {/* Full Tentacle Frame on OUTSIDE of box - only in Upside Down mode */}
                                {isUpsideDown && (
                                    <div className="absolute -inset-6 pointer-events-none z-30 rounded-lg overflow-hidden"
                                        style={{
                                            backgroundImage: 'url(/tentacle_frame.png)',
                                            backgroundSize: '100% 100%',
                                            backgroundRepeat: 'no-repeat',
                                            filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.5))'
                                        }}
                                    />
                                )}
                                <div className={`absolute inset-0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isUpsideDown ? 'rounded-lg bg-gradient-to-r from-red-900/30 via-red-800/30 to-red-900/30' : 'rounded-xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20'}`}></div>
                                <div
                                    className={`relative backdrop-blur-lg p-6 ${isUpsideDown ? 'rounded-lg bg-black/50 border border-red-900/50' : 'rounded-xl bg-white/5 border border-white/10'}`}
                                    style={isUpsideDown ? {
                                        backgroundImage: 'url(/skill_power_bg.png?v=1)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundBlendMode: 'screen'
                                    } : {}}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-semibold text-white">{skill.name}</span>
                                        <span className={`text-sm ${isUpsideDown ? 'text-red-400' : 'text-cyan-400'}`}>{skill.level}%</span>
                                    </div>
                                    <div className={`h-2 rounded-full overflow-hidden ${isUpsideDown ? 'bg-red-950/50' : 'bg-white/10'}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className={`h-full rounded-full ${isUpsideDown
                                                ? 'bg-gradient-to-r from-red-600 to-red-400'
                                                : `bg-gradient-to-r ${skill.color}`
                                                }`}
                                            style={isUpsideDown ? { boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)' } : {}}
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
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className={`text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent ${isUpsideDown
                        ? 'bg-gradient-to-r from-red-400 to-red-600'
                        : 'bg-gradient-to-r from-pink-400 to-purple-400'
                        }`}>
                        {isUpsideDown ? 'FORBIDDEN KNOWLEDGE' : 'Beyond Code'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {(isUpsideDown ? [
                            { icon: '🔮', title: 'Dark Arts', description: 'Coding in the void' },
                            { icon: '🩸', title: 'Creation', description: 'Designing nightmares' },
                            { icon: '📜', title: 'Secrets', description: 'Ancient knowledge' },
                            { icon: '🎰', title: 'Fortune', description: 'Testing fate' },
                            { icon: '📻', title: 'Signals', description: 'Messages from beyond' },
                            { icon: '🚀', title: 'Escape', description: 'Dimension hopping' }
                        ] : interests).map((interest, index) => (
                            <motion.div
                                key={interest.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                animate={{
                                    scale: 1,
                                    rotate: activeInterestIndex === index ? 5 : 0
                                }}
                                whileHover={{ rotate: 5 }}
                                className="relative group cursor-pointer"
                            >

                                <div className={`absolute inset-0 blur-lg transition-opacity duration-500 ${activeInterestIndex === index ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'} ${isUpsideDown ? 'rounded-lg bg-gradient-to-br from-red-900 via-red-800 to-red-900' : 'rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500'}`}></div>
                                <div className={`relative backdrop-blur-lg p-4 sm:p-6 text-center overflow-hidden ${isUpsideDown ? 'rounded-lg bg-black/50 border border-red-900/50' : 'rounded-3xl bg-white/5 border border-white/10'}`}>
                                    <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{interest.icon}</div>
                                    <h4 className="font-semibold text-sm sm:text-base mb-1">{interest.title}</h4>
                                    <p className={`text-xs hidden sm:block ${isUpsideDown ? 'text-red-300/60' : 'text-white/60'}`}>{interest.description}</p>
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
