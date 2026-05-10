import { useEffect, useRef } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRight } from 'lucide-react'
import type { Location } from "../types.ts"


interface LocationStepProps {
  onFromSelect: (location: Location) => void
  onToSelect: (location: Location) => void
  fromLocation: Location
  toLocation: Location
}

export function LocationStep({ onFromSelect, onToSelect, fromLocation, toLocation }: LocationStepProps) {
  const places = useMapsLibrary('places')
  const fromRef = useRef<HTMLInputElement>(null)
  const toRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!places || !fromRef.current || !toRef.current) return

    const options = {
      fields: ['formatted_address', 'geometry'],
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }
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
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-sm text-zinc-400 uppercase tracking-widest">Where are you moving?</p>

      <div className="flex items-end gap-4 w-full">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="from-location" className="text-sm font-medium text-zinc-600">
            Moving from{fromLocation.formattedAddress ? `: ${fromLocation.formattedAddress}` : ''}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              ref={fromRef}
              id="from-location"
              type="text"
              className="pl-9"
              placeholder="City, State"
            />
          </div>
        </div>

        <div className="pb-2">
          <ArrowRight className="w-5 h-5 text-zinc-300" />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="to-location" className="text-sm font-medium text-zinc-600">
            Moving to{toLocation.formattedAddress ? `: ${toLocation.formattedAddress}` : ''}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              ref={toRef}
              id="to-location"
              type="text"
              className="pl-9"
              placeholder="City, State"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
