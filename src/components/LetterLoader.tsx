import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAME = 'Anderson Pontes'
const STORAGE_KEY = 'ap_seen_v3'

const LetterLoader = () => {
    const [visible, setVisible] = useState(false)
    const [chars, setChars] = useState(0)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem(STORAGE_KEY)) return

        setVisible(true)
        document.body.style.overflow = 'hidden'

        let count = 0
        const id = setInterval(() => {
            count++
            setChars(count)
            if (count >= NAME.length) {
                clearInterval(id)
                setTimeout(() => {
                    setExiting(true)
                    setTimeout(() => {
                        document.body.style.overflow = ''
                        sessionStorage.setItem(STORAGE_KEY, '1')
                        setVisible(false)
                    }, 800)
                }, 500)
            }
        }, 75)

        return () => clearInterval(id)
    }, [])

    if (!visible) return null

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[200] bg-surface-base flex items-center justify-center"
                    role="status"
                    aria-label="Carregando"
                >
                    <p
                        className="font-display text-4xl md:text-6xl text-ink-primary tracking-tight select-none"
                        aria-hidden="true"
                    >
                        {NAME.split('').map((ch, i) => (
                            <span
                                key={i}
                                className="inline-block"
                                style={{
                                    opacity: i < chars ? 1 : 0,
                                    transform: i < chars ? 'translateY(0)' : 'translateY(8px)',
                                    transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
                                    whiteSpace: ch === ' ' ? 'pre' : undefined,
                                }}
                            >
                                {ch}
                            </span>
                        ))}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LetterLoader
