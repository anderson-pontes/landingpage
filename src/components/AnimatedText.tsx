import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedTextProps {
    text: string
    className?: string
}

const AnimatedText = ({ text, className = '' }: AnimatedTextProps) => {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, 80)

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text])

    return (
        <motion.span
            className={`${className} text-glow`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-8 bg-cyan-400 ml-1"
            />
        </motion.span>
    )
}

export default AnimatedText