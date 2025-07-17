interface SkillBadgeProps {
  skill: string
  level: 'basic' | 'intermediate' | 'advanced'
}

const SkillBadge = ({ skill, level }: SkillBadgeProps) => {
  const levelColors = {
    basic: 'bg-blue-100 text-blue-800',
    intermediate: 'bg-green-100 text-green-800',
    advanced: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="flex items-center">
      <span className={`px-4 py-2 rounded-full font-medium ${levelColors[level]}`}>
        {skill}
      </span>
      <div className="ml-3 w-24 h-2 bg-gray-200 rounded-full">
        <div 
          className={`h-full rounded-full ${
            level === 'basic' ? 'bg-blue-500 w-1/3' : 
            level === 'intermediate' ? 'bg-green-500 w-2/3' : 
            'bg-purple-500 w-full'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default SkillBadge