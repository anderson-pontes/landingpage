import { motion } from 'framer-motion'

interface FloatingIconProps {
    icon: string
    delay?: number
    className?: string
}

const FloatingIcon = ({ icon, delay = 0, className = '' }: FloatingIconProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.2, rotate: 360 }}
            className={`text-4xl ${className}`}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                {icon}
            </motion.div>
        </motion.div>
    )
}

export default FloatingIcon
