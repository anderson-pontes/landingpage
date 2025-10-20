import { motion } from 'framer-motion'

const ParticlesBackground = () => {
    const particles = Array.from({ length: 50 }, (_, i) => {
        const colors = [
            'bg-cyan-400',
            'bg-purple-500',
            'bg-pink-500',
            'bg-blue-400',
        ]
        return {
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2, // Tamanho maior: 2-8px
            duration: Math.random() * 15 + 10, // 10-25 segundos
            delay: Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
        }
    })

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full ${particle.color}`}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        filter: 'blur(1px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    )
}

export default ParticlesBackground
