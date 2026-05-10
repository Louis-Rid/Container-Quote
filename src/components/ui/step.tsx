

interface StepProps {
  className?: string
  stepPosition: number
}

export function Step({ className }: StepProps) {

  return (
    <>
      <div className={className}>
      </div >
    </>
  )
}

