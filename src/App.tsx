import { useEffect, useState, useRef } from 'react'
import type { QuoteForm, Location } from './types';
import { LocationStep } from "./components/LocationStep.tsx";
import { ContainerStep } from "./components/ContainerStep.tsx";
import './App.css'
import { DurationStep } from './components/DurationStep.tsx';
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { ResultsStep } from './components/ResultsStep.tsx';
import { StepsHeader } from "./components/StepsHeader.tsx";
import { ButtonNavigation } from './components/ButtonNavigation.tsx';


function App() {
  const [position, setPosition] = useState(1);
  const [quote, setQuote] = useState<QuoteForm>({
    fromLocation: { formattedAddress: "", lat: 0, lng: 0 },
    toLocation: { formattedAddress: "", lat: 0, lng: 0 },
    containerSize: "8ft",
    durationWeeks: 1,
    distanceMiles: 0

  });
  const pageCompleted = useRef(false);

  const pages = [
    <LocationStep toLocation={quote.toLocation} fromLocation={quote.fromLocation} pageComplete={pageCompleted} onFromSelect={(address: Location) => setQuote(prev => ({ ...prev, fromLocation: address }))}
      onToSelect={(address: Location) => setQuote(prev => ({ ...prev, toLocation: address }))} />,
    < ContainerStep pageComplete={pageCompleted} selected={quote.containerSize} onSelect={(size) => setQuote(prev => ({ ...prev, containerSize: size }))} />,
    < DurationStep duration={quote.durationWeeks} pageComplete={pageCompleted} onDurationChange={(duration) => setQuote(prev => ({ ...prev, durationWeeks: duration }))} />,
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
      <section className='@container  h-screen max-h-125 p-5'>
        <div className='max-w-200 w-full flex flex-col mx-auto h-full items-center'>
          <StepsHeader position={position} />
          <div className="flex flex-col grow items-center justify-center w-full">
            {pages[position - 1]}
          </div>
          <ButtonNavigation isStepComplete={isStepComplete(position)} position={position} setPosition={(newPosition: number) => setPosition(newPosition)} />
        </div>
      </section >

    </>
  )
}

export default App
