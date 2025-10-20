import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlowCardProps {
    children: ReactNode
    className?: string
    delay?: number
}

const GlowCard = ({ children, className = '', delay = 0 }: GlowCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative group ${className}`}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                {children}
            </div>
        </motion.div>
    )
}

export default GlowCard
