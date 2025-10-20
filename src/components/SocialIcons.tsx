import { motion } from 'framer-motion'

const SocialIcons = () => {
    const socials = [
        { name: 'GitHub', url: 'https://github.com/anderson-pontes/', icon: 'github', color: 'hover:text-purple-400' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/andersonps-pontes/', icon: 'linkedin', color: 'hover:text-cyan-400' },
    ]

    return (
        <div className="flex space-x-4">
            {socials.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 bg-slate-800/50 border border-slate-700 rounded-xl ${social.color} transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20`}
                    aria-label={social.name}
                >
                    <span className="sr-only">{social.name}</span>
                    <i className={`fab fa-${social.icon} text-2xl`}></i>
                </motion.a>
            ))}
        </div>
    )
}

export default SocialIcons