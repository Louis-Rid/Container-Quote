import { useEffect, useState } from 'react'
import type { QuoteForm, Location, Steps } from './types';
import { LocationStep } from "./components/LocationStep.tsx";
import { ContainerStep } from "./components/ContainerStep.tsx";
import './App.css'
import { DurationStep } from './components/DurationStep.tsx';
import { useMapsLibrary } from '@vis.gl/react-google-maps'


function App() {
  const [position, setPosition] = useState<Steps>(1);
  const [quote, setQuote] = useState<QuoteForm>({
    fromLocation: { formattedAddress: "", lat: 0, lng: 0 },
    toLocation: { formattedAddress: "", lat: 0, lng: 0 },
    containerSize: "8ft",
    durationWeeks: 1,
    distanceMiles: 0
  });



  const pages = [
    <LocationStep onFromSelect={(address: Location) => setQuote(prev => ({ ...prev, fromLocation: address }))}
      onToSelect={(address: Location) => setQuote(prev => ({ ...prev, toLocation: address }))} />,
    < ContainerStep selected={quote.containerSize} onSelect={(size) => setQuote(prev => ({ ...prev, containerSize: size }))} />,
    < DurationStep duration={quote.durationWeeks} onDurationChange={(duration) => setQuote(prev => ({ ...prev, durationWeeks: duration }))} />,
    "RESULTS"]

  const routes = useMapsLibrary('routes')

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
        <div className='max-w-200 w-full flex flex-col mx-auto h-full'>
          <div className='steps'>
            <ol className="flex justify-between gap-1">
              <li className={`${position === 1 ? 'step-active' : ''}`}>Step 1</li>
              <li className={`${position === 2 ? 'step-active' : ''}`}>Step 2</li>
              <li className={`${position === 3 ? 'step-active' : ''}`}>Step 3</li>
              <li className={`${position === 4 ? 'step-active' : ''}`}>Review</li>
            </ol>
          </div>
          <div className="flex flex-col grow items-center justify-center">
            {pages[position - 1]}
          </div>
          <div className="flex self-center justify-between w-full max-w-25 items-center">
            <button onClick={() => setPosition(Math.max(1, position - 1))}>left</button>
            <p>{position}</p>
            <button onClick={() => setPosition(Math.min(4, position + 1))}>right</button>
          </div>
        </div>
      </section>

    </>
  )
}

export default App
