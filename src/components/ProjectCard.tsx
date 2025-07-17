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
    <div className="bg-light dark:bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-dark/70 dark:text-light/70 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map(tech => (
            <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
      
      </div>
    </div>
  )
}

export default ProjectCard