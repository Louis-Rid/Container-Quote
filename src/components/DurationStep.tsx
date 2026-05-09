
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { ButtonGroup } from "@/components/ui/button-group"


interface DurationStepProps {
  duration: number
  onDurationChange: (duration: number) => void

}

export function DurationStep({ duration, onDurationChange }: DurationStepProps) {
  return (
    <>
      <div className="flex gap-5">
        {/* <ButtonGroup */}
        {/*   orientation="vertical" */}
        {/*   aria-label="Media controls" */}
        {/*   className="h-fit" */}
        {/* > */}
        <h2>Duration: {duration} weeks</h2>
        <Button variant="outline" size="icon" onClick={() => onDurationChange(Math.min(8, duration + 1))}>
          <PlusIcon />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDurationChange(Math.max(1, duration - 1))}>
          <MinusIcon />
        </Button>
        {/* </ButtonGroup> */}

      </div>
    </>
  )
}
