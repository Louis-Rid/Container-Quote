import { useEffect } from 'react'
import { getPrice } from '@/lib/pricing'
import type { UseRouteCalculatorProps } from '@/types'

export function useRouteCalculator({ routes, quote, setQuote }: UseRouteCalculatorProps) {
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
        const newQuote = { ...quote, distanceMiles: Math.round(distanceInMiles) };
        const price = getPrice(newQuote);
        setQuote({ ...newQuote, price })
      }
    })
  }, [routes, quote.fromLocation, quote.toLocation])
}
