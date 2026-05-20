import { useEffect, type SetStateAction } from 'react'
import type { QuoteForm, ResultsStepProps } from '@/types'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { MapPin, Package, Clock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouteCalculator } from '@/hooks/useRouteCalculator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export function ResultsStep({ quote, setQuote }: ResultsStepProps) {
  const routes = useMapsLibrary('routes')
  useRouteCalculator({ routes, quote, setQuote })

  const rows = [
    {
      label: "Base Cost",
      subLabel: quote.containerSize,
      price: quote.price.baseCost
    }, {
      label: "Delivery Fee",
      subLabel: `${quote.distanceMiles} miles`,
      price: quote.price.deliveryFee
    }, {
      label: "Storage Fee",
      subLabel: `${quote.durationWeeks} weeks`,
      price: quote.price.durationFee
    },

  ]

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <p className="text-sm text-zinc-400 uppercase tracking-widest text-center mt-6 mb-3">Your estimate</p>
      <div className="flex flex-col gap-2 bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{quote.fromLocation.formattedAddress}</span>
          <ArrowRight className="w-4 h-4 text-zinc-300 shrink-0" />
          <span>{quote.toLocation.formattedAddress}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4 text-emerald-400" />
            <span>{quote.containerSize} container</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{quote.durationWeeks} {quote.durationWeeks === 1 ? 'week' : 'weeks'}</span>
          </div>
        </div>
      </div>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Cost Breakdown</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            return (<TableRow key={i}>
              <TableCell className="font-medium">{row.label}
                <p className="text-xs text-zinc-400 font-normal">{row.subLabel}</p>
              </TableCell>
              <TableCell className="text-right">{row.price}</TableCell>
            </TableRow>)
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-base font-bold">Total Estimate</TableCell>
            <TableCell className="text-right text-base font-bold text-emerald-600">
              {quote.price.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button
        size="lg"
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-4"
        onClick={() => window.open('https://www.pods.com/', '_blank')}
      >
        Get a Real Quote
      </Button>

      <p className="text-xs text-zinc-400 text-center mb-6">
        This is not a real quote. Figures shown are estimates for demonstration purposes only and do not reflect actual pricing.
      </p>
    </div >
  )
}
