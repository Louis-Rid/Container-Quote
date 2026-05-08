import { useState } from 'react'
import type { QuoteForm, PricingMap, Steps } from './types';
import './App.css'
import 'dotenv/config';

const pages = ["LOCATION", "CONTAINER", "DURATION", "RESULTS"]
const BASE_PRICES: PricingMap = {
  "8ft": 149,
  "12ft": 189,
  "16ft": 225,
}
function App() {
  const [quote, setQuote] = useState<QuoteForm>({
    fromLocation: "",
    toLocation: "",
    containerSize: "8ft",
    durationWeeks: 1
  });
  const [position, setPosition] = useState<Steps>(1);

  return (
    <>
      <section className='@container  h-screen max-h-125 p-5'>
        <div className='max-w-200 w-full flex flex-col mx-auto h-full'>
          <div className='steps'>
            <h1>{process.env.GOOGLE_API}</h1>
            <ol className="flex justify-between gap-1">
              <li className={`${position === 1 ? 'step-active' : ''}`}>Step 1</li>
              <li className={`${position === 2 ? 'step-active' : ''}`}>Step 2</li>
              <li className={`${position === 3 ? 'step-active' : ''}`}>Step 3</li>
              <li className={`${position === 4 ? 'step-active' : ''}`}>Review</li>
            </ol>
          </div>
          <div className="flex flex-col grow items-center justify-center">
            <h2>{pages[position - 1]}</h2>
          </div>
          <div className="flex self-center justify-between w-full max-w-25 items-center">
            <button onClick={() => setPosition(Math.max(1, position - 1))}>left</button>
            <p>{position}</p>
            <button onClick={() => setPosition(Math.min(4, position + 1))}>right</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
