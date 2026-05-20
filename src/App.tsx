import { useEffect, useState, useRef } from 'react'
import type { QuoteForm, FormResults, Location, GoToStep } from './types';
import { LocationStep } from "./components/LocationStep.tsx";
import { ContainerStep } from "./components/ContainerStep.tsx";
import './App.css'
import { DurationStep } from './components/DurationStep.tsx';
import { ResultsStep } from './components/ResultsStep.tsx';
import { StepsHeader } from "./components/StepsHeader.tsx";
import { ButtonNavigation } from './components/ButtonNavigation.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
import { useAnimation } from "./hooks/useAnimation.tsx";




function App() {
  const [position, setPosition] = useState(1);
  const [quote, setQuote] = useState<QuoteForm>({
    fromLocation: { formattedAddress: "", lat: 0, lng: 0 },
    toLocation: { formattedAddress: "", lat: 0, lng: 0 },
    containerSize: "",
    durationWeeks: 0,
    distanceMiles: 0,
    price: { baseCost: "", deliveryFee: "", durationFee: "", total: "" },
  });
  const goToStepRef = useRef<GoToStep | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayPosition, setDisplayPosition] = useState(1)
  const isAnimating = useRef(false)

  useAnimation({ goToStepRef, containerRef, setDisplayPosition, isAnimating });

  const pages = [
    <LocationStep toLocation={quote.toLocation} fromLocation={quote.fromLocation} onFromSelect={(address: Location) => setQuote(prev => ({ ...prev, fromLocation: address }))}
      onToSelect={(address: Location) => setQuote(prev => ({ ...prev, toLocation: address }))} />,
    < ContainerStep selected={quote.containerSize} onSelect={(size) => setQuote(prev => ({ ...prev, containerSize: size }))} />,
    < DurationStep duration={quote.durationWeeks} onDurationChange={(duration) => setQuote(prev => ({ ...prev, durationWeeks: duration }))} />,
    < ResultsStep quote={quote} setQuote={setQuote} />]



  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return !!quote.fromLocation.formattedAddress && !!quote.toLocation.formattedAddress
      case 2: return !!quote.containerSize
      case 3: return quote.durationWeeks > 0
      default: return true
    }
  }

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
