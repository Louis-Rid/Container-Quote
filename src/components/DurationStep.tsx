
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"


interface DurationStepProps {
  duration: number
  onDurationChange: (duration: number) => void

}

export function DurationStep({ duration, onDurationChange }: DurationStepProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm text-zinc-400 uppercase tracking-widest">How long do you need storage?</p>
      </div>

      <div className="flex items-center gap-8">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          onClick={() => onDurationChange(Math.max(1, duration - 1))}
          disabled={duration === 1}
        >
          <MinusIcon className="w-5 h-5" />
        </Button>

        <div className="flex flex-col items-center w-24">
          <span className="text-7xl font-bold text-emerald-500">{duration}</span>
          <span className="text-zinc-400 text-sm">{duration === 1 ? 'week' : 'weeks'}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          onClick={() => onDurationChange(Math.min(8, duration + 1))}
          disabled={duration === 8}
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${i < duration ? 'bg-emerald-500' : 'bg-zinc-200'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
