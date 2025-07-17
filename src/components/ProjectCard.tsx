interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  demoUrl: string
  codeUrl: string
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  imageUrl, 
  demoUrl, 
  codeUrl 
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
        
        <div className="flex space-x-4">
          <a 
            href={demoUrl} 
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Demo
          </a>
          <a 
            href={codeUrl} 
            className="px-4 py-2 border border-primary text-primary dark:text-light rounded-lg text-sm hover:bg-primary/10 transition-colors"
          >
            Código
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard