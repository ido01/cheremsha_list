import { useEffect, useState } from 'react'

export default function useOnScreen(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
        threshold: 0.75,
    })

    useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}
