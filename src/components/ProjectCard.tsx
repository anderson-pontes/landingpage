import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ProjectCardProps {
    title: string
    description: ReactNode
    technologies: string[]
    imageUrl: string
    demoUrl: string
}

const ProjectCard = ({ title, description, technologies, imageUrl, demoUrl }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative group rounded-xl overflow-hidden border border-surface-border bg-surface-1 flex flex-col"
            style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
        >
            <div className="relative h-44 overflow-hidden shrink-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-surface-base/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                    <p className="text-ink-secondary text-sm leading-relaxed mb-4">{description}</p>
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-accent-light transition-colors font-semibold"
                    >
                        Ver projeto <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-mono text-sm font-semibold text-ink-primary">{title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="font-mono text-xs text-ink-muted border border-surface-border bg-surface-2 rounded px-2 py-0.5"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
