interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string
}

const ExperienceCard = ({ title, company, period, description }: ExperienceCardProps) => {
  return (
    <div className="bg-light dark:bg-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <h4 className="text-xl font-semibold mb-1">{title}</h4>
      <p className="text-primary font-medium mb-2">{company}</p>
      <p className="text-sm text-dark/60 dark:text-light/60 mb-4">{period}</p>
      <p className="text-dark/80 dark:text-light/80">{description}</p>
    </div>
  )
}

export default ExperienceCard