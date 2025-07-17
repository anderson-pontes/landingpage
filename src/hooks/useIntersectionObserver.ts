import { useEffect, useState } from 'react'

const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isIntersecting
}

export default useIntersectionObserver