import { motion } from 'framer-motion'
import type { ReactNode } from "react"

interface ProjectCardProps {
    title: string
    description: ReactNode
    technologies: string[]
    imageUrl: string
    demoUrl: string
}

const ProjectCard = ({
    title,
    description,
    technologies,
    imageUrl,
}: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="relative group"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                    <motion.img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 gradient-text">{title}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 text-cyan-400 text-sm rounded-full hover:border-cyan-400 transition-colors"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard