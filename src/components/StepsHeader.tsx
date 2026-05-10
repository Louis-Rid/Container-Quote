
import { useEffect, useState } from 'react'
interface StepsProps {
  position: number
}
const PAGE_TITLES = ['Location', 'Container', 'Duration', 'Results'];

export function StepsHeader({ position }: StepsProps) {

  return (<>
    <ol className="flex items-center w-full">
      {PAGE_TITLES.map((title, index) => {
        const stepNumber = index + 1;
        const isCompleted = position > stepNumber;
        const isActive = position === stepNumber;

        let conditionalClasses = "";

        conditionalClasses += isCompleted ? 'bg-emerald-500 text-white' : "";
        conditionalClasses += isActive ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' : "";
        conditionalClasses += !isActive && !isCompleted ? 'bg-zinc-100 text-zinc-400' : "";

        return (
          <li key={title} className='flex items-center flex-1 last:flex-none'>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${conditionalClasses}`}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span className={`text-xs ${isActive ? 'text-emerald-600 font-medium' : 'text-zinc-400'}`}>
                {title}
              </span>
            </div>
            {stepNumber < PAGE_TITLES.length && (
              <div className={`flex-1 h-0.5 mb-5 mx-2 transition-colors
            ${isCompleted ? 'bg-emerald-500' : 'bg-zinc-200'}
          `} />
            )}
          </li>
        )
      })}
    </ol>
  </>)
}

