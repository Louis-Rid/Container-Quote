
import { Card } from "@/components/ui/card"
import type { ContainerSize } from '@/types'

interface ContainerCards {
  size: ContainerSize
  dimensions: string,
  description: string,
}

const containers: ContainerCards[] = [
  { size: '8ft', dimensions: '8 x 8 x 8', description: 'a studio or small bedroom' },
  { size: '12ft', dimensions: '12 x 8 x 8', description: 'a 1-2 bedroom apartment' },
  { size: '16ft', dimensions: '16 x 8 x 8', description: 'a full house move' },
]
interface ContainerStepProps {
  selected: ContainerSize
  onSelect: (size: ContainerSize) => void
}

const baseCardClasses = "cursor-pointer w-full p-4 border-2 transition-colors grow gap-0";
export function ContainerStep({ selected, onSelect }: ContainerStepProps) {
  return (
    <>
      <div className="flex gap-5">
        {containers.map((container) => (
          <Card
            key={container.size}
            onClick={() => onSelect(container.size)}
            className={`${baseCardClasses} ${selected === container.size
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-transparent hover:border-emerald-200'
              }`}
          >
            <h3 className="text-lg font-bold">{container.size}</h3>
            <p className="text-sm text-zinc-500 mb-2">{container.dimensions}</p>
            <p className="mb-0 text-zinc-500">Ideal for:</p>
            <p className="text-sm m-0">{container.description}</p>
          </Card>
        ))}</div>
    </>
  )
}
