const SocialIcons = () => {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/anderson-pontes/', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/andersonps-pontes/', icon: 'linkedin' },
  ]

  return (
    <div className="flex space-x-4">
      {socials.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-dark/10 dark:bg-light/10 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label={social.name}
        >
          <span className="sr-only">{social.name}</span>
          <i className={`fab fa-${social.icon} text-xl`}></i>
        </a>
      ))}
    </div>
  )
}

export default SocialIcons