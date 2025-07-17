import { useEffect, useState } from 'react'

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
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span className={`${className}`}>{displayText}</span>
}

export default AnimatedText