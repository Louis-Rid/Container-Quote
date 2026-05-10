import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from '@/components/ui/button';

interface ButtonNavigationProps {
  position: number
  setPosition: (newPosition: number) => void
  isStepComplete: boolean
}

export function ButtonNavigation({ position, setPosition, isStepComplete }: ButtonNavigationProps) {
  return (
    <>
      <div className="flex self-center justify-between w-full items-center">
        <Button
          variant="outline"
          onClick={() => setPosition(Math.max(1, position - 1))}
          disabled={position === 1}
          className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <Button
          onClick={() => setPosition(Math.min(4, position + 1))}
          disabled={!isStepComplete}
          className={position === 4 ? 'hidden' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}
        >
          {position === 3 ? 'See My Quote' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

    </>
  )
}

