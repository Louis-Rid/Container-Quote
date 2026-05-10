import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import type { ContainerSize } from '@/types'
import { Package } from "lucide-react"

interface ContainerCards {
  size: ContainerSize
  dimensions: string
  description: string
  popular?: boolean
  widthClass: string
  iconSize: number
}


const containers: ContainerCards[] = [
  { size: '8ft', dimensions: '8 x 8 x 8', description: 'a studio or small bedroom', widthClass: 'w-12', iconSize: 32 },
  { size: '12ft', dimensions: '12 x 8 x 8', description: 'a 1-2 bedroom apartment', popular: true, widthClass: 'w-16', iconSize: 42 },
  { size: '16ft', dimensions: '16 x 8 x 8', description: 'a full house move', widthClass: 'w-20', iconSize: 52 },
]
interface ContainerStepProps {
  selected: ContainerSize
  onSelect: (size: ContainerSize) => void
}

export function ContainerStep({ selected, onSelect }: ContainerStepProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-sm text-zinc-400 uppercase tracking-widest">Select your container size</p>
      <div className="flex gap-4 w-full">
        {containers.map((container) => {
          const isSelected = selected === container.size
          return (
            <Card
              key={container.size}
              onClick={() => onSelect(container.size)}
              className={`relative cursor-pointer flex-1 p-5 border-2 transition-all flex flex-col gap-3
                ${isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-transparent hover:border-emerald-200'
                }`}
            >

              {container.popular && (
                <span className={`absolute ${isSelected ? 'right-10' : 'right-3'} h-[20px]  top-3  self-start bg-emerald-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full`}>
                  Most Popular
                </span>
              )}
              {isSelected && (
                <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-emerald-500" />
              )}

              <div className="flex items-start gap-2 flex-col">

                <Package
                  size={container.iconSize}
                  className={`transition-colors ${isSelected ? 'text-emerald-500' : 'text-zinc-300'}`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold">{container.size}</h3>
                <p className="text-xs text-zinc-400">{container.dimensions}</p>
              </div>

              <p className="text-sm text-zinc-500">Ideal for {container.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
