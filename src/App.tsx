import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { QuoteForm, Location } from './types';
import { LocationStep } from "./components/LocationStep.tsx";
import { ContainerStep } from "./components/ContainerStep.tsx";
import './App.css'
import { DurationStep } from './components/DurationStep.tsx';
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { ResultsStep } from './components/ResultsStep.tsx';
import { StepsHeader } from "./components/StepsHeader.tsx";
import { ButtonNavigation } from './components/ButtonNavigation.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
gsap.registerPlugin(useGSAP)


function App() {
  const [position, setPosition] = useState(1);
  const [quote, setQuote] = useState<QuoteForm>({
    fromLocation: { formattedAddress: "", lat: 0, lng: 0 },
    toLocation: { formattedAddress: "", lat: 0, lng: 0 },
    containerSize: "",
    durationWeeks: 0,
    distanceMiles: 0

  });
  const goToStepRef = useRef<((nextStep: number, direction: 'forward' | 'back') => void) | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayPosition, setDisplayPosition] = useState(1)
  const isAnimating = useRef(false)

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

  const pages = [
    <LocationStep toLocation={quote.toLocation} fromLocation={quote.fromLocation} onFromSelect={(address: Location) => setQuote(prev => ({ ...prev, fromLocation: address }))}
      onToSelect={(address: Location) => setQuote(prev => ({ ...prev, toLocation: address }))} />,
    < ContainerStep selected={quote.containerSize} onSelect={(size) => setQuote(prev => ({ ...prev, containerSize: size }))} />,
    < DurationStep duration={quote.durationWeeks} onDurationChange={(duration) => setQuote(prev => ({ ...prev, durationWeeks: duration }))} />,
    < ResultsStep quote={quote} />]

  const routes = useMapsLibrary('routes')


  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return !!quote.fromLocation.formattedAddress && !!quote.toLocation.formattedAddress
      case 2: return !!quote.containerSize
      case 3: return quote.durationWeeks > 0
      default: return true
    }
  }

  useEffect(() => {
    if (!routes || !quote.fromLocation.lat || !quote.toLocation.lat) return

    const distanceMatrix = new routes.DistanceMatrixService()

    distanceMatrix.getDistanceMatrix({
      origins: [{ lat: quote.fromLocation.lat, lng: quote.fromLocation.lng }],
      destinations: [{ lat: quote.toLocation.lat, lng: quote.toLocation.lng }],
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK' && response) {
        const distanceInMeters = response.rows[0].elements[0].distance.value
        const distanceInMiles = distanceInMeters * 0.000621371
        setQuote(prev => ({ ...prev, distanceMiles: Math.round(distanceInMiles) }))
      }
    })
  }, [routes, quote.fromLocation, quote.toLocation])
  return (
    <>
      <section className='@container   p-5'>
        <div className='max-w-100 md:max-w-200 w-full flex flex-col mx-auto h-full items-center'>
          <StepsHeader position={position} />
          <div ref={containerRef} className="flex flex-col grow items-center justify-center w-full">
            {pages[displayPosition - 1]}
          </div>
          <ButtonNavigation changePosition={(nextStep, direction) => goToStepRef.current?.(nextStep, direction)} setPosition={(newPosition: number) => setPosition(newPosition)} isStepComplete={isStepComplete(position)} position={position} />
        </div>
        <ChatWidget />
      </section >

    </>
  )
}

export default App
