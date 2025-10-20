import { motion } from 'framer-motion'

interface SkillBadgeProps {
    skill: string
    level: 'basic' | 'intermediate' | 'advanced'
}

const SkillBadge = ({ skill, level }: SkillBadgeProps) => {
    const levelConfig = {
        basic: { width: '33%', color: 'from-blue-500 to-cyan-500' },
        intermediate: { width: '66%', color: 'from-cyan-500 to-purple-500' },
        advanced: { width: '100%', color: 'from-purple-500 to-pink-500' },
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group"
        >
            <span className="px-4 py-2 rounded-lg font-medium bg-slate-800/50 border border-slate-700 text-slate-200 group-hover:border-cyan-500/50 transition-colors">
                {skill}
            </span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: levelConfig[level].width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${levelConfig[level].color}`}
                />
            </div>
        </motion.div>
    )
}

export default SkillBadge