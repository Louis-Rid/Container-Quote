import type { AnimationProps } from '@/types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)


export function useAnimation({ goToStepRef, containerRef, setDisplayPosition, isAnimating }: AnimationProps) {

  const { contextSafe } = useGSAP({ scope: containerRef })

  useGSAP(() => {
    const animate = contextSafe((nextStep: number, direction: 'forward' | 'back') => {
      if (isAnimating.current) return
      isAnimating.current = true

      const xOut = direction === 'forward' ? -50 : 50
      const xIn = direction === 'forward' ? 50 : -50

      gsap.to(containerRef.current, {
        opacity: 0,
        x: xOut,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayPosition(nextStep)
          gsap.set(containerRef.current, { x: xIn, opacity: 0 })
          gsap.to(containerRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              isAnimating.current = false
            }
          })
        }
      })
    })

    goToStepRef.current = animate
  }, [contextSafe])
}

