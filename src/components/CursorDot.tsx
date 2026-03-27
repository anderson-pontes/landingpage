import { useEffect, useRef } from 'react'

const CursorDot = () => {
    const dotRef = useRef<HTMLDivElement>(null)
    const mouse = useRef({ x: -20, y: -20 })
    const raf = useRef<number>(0)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const isTouchDevice = 'ontouchstart' in window
        if (prefersReduced || isTouchDevice) return

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', onMove)

        const loop = () => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
            }
            raf.current = requestAnimationFrame(loop)
        }
        raf.current = requestAnimationFrame(loop)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <div
            ref={dotRef}
            aria-hidden="true"
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[150] hidden md:block"
        />
    )
}

export default CursorDot
