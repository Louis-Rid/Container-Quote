import { useEffect, useRef } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { Input } from "@/components/ui/input"
import type { Location } from "../types.ts"


interface LocationStepProps {
  onFromSelect: (location: Location) => void
  onToSelect: (location: Location) => void
}

export function LocationStep({ onFromSelect, onToSelect }: LocationStepProps) {
  const places = useMapsLibrary('places')
  const fromRef = useRef<HTMLInputElement>(null)
  const toRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!places || !fromRef.current || !toRef.current) return

    const options = {
      fields: ['formatted_address', 'geometry'],
      types: ['(cities)']
    }

    const fromAutocomplete = new places.Autocomplete(fromRef.current, options)
    const toAutocomplete = new places.Autocomplete(toRef.current, options)

    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace()
      if (place.formatted_address && place.geometry?.location) {
        onFromSelect({ formattedAddress: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
      }
    })

    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace()
      if (place.formatted_address && place.geometry?.location) {
        onToSelect({ formattedAddress: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
      }
    })

  }, [places, onFromSelect, onToSelect])

  return (
    <>
      <div className="flex gap-5">
        <label htmlFor="from-location">Moving from...
          <Input ref={fromRef} id="from-location" type="text" />
        </label>
        <label htmlFor="to-location">Moving to...
          <Input ref={toRef} id="to-location" type="text" />
        </label>
      </div>
    </>
  )
}
