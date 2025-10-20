import { motion } from 'framer-motion'

interface ExperienceCardProps {
    title: string
    company: string
    period: string
    description: string
}

const ExperienceCard = ({ title, company, period, description }: ExperienceCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative group"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-cyan-400">{title}</h4>
                    <motion.div
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
                <p className="text-purple-400 font-medium mb-2">{company}</p>
                <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                    <span className="text-cyan-400">⏱</span> {period}
                </p>
                <p className="text-slate-300 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}

export default ExperienceCard