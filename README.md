# Container Quote

A full-stack moving cost estimator built with React and TypeScript, featuring real driving distance calculation, GSAP animations, and an AI chat assistant. Users enter their origin and destination cities, select a container size, and choose a storage duration — then receive an itemized cost estimate based on real driving distance data from Google Maps.

Built to demonstrate proficiency in React, TypeScript, and modern frontend engineering practices.

> **Note:** This is not affiliated with any enterpriseses. Cost estimates are for demonstration purposes only and do not reflect actual pricing.

---

## Live Demo

🔗 [container-quote.azurestaticapps.net](https://container-quote.azurestaticapps.net) _(coming soon)_

---

## Features

- **Multi-step form** with smooth GSAP slide transitions between steps
- **Google Places Autocomplete** restricted to US cities with real coordinate data
- **Live driving distance** calculated via Google Maps Distance Matrix API
- **Itemized cost breakdown** with base rate, delivery fee, and storage fee
- **AI chat assistant** powered by Claude — ask it anything about the developer behind the project
- **Step validation** preventing progression until each step is complete
- **Fully responsive** layout built with Tailwind CSS

---

## Tech Stack

| Category   | Technology                               |
| ---------- | ---------------------------------------- |
| Framework  | React 19 + TypeScript                    |
| Build Tool | Vite                                     |
| Styling    | Tailwind CSS v4 + shadcn/ui              |
| Animations | GSAP + @gsap/react                       |
| Maps       | Google Maps Places & Distance Matrix API |
| AI         | Claude (Anthropic API)                   |
| Deployment | Azure Static Web Apps                    |

---

## Project Structure

```
src/
├── components/
│   ├── LocationStep.tsx      # Google Places autocomplete inputs
│   ├── ContainerStep.tsx     # Visual container size selector
│   ├── DurationStep.tsx      # Week duration picker with dot indicator
│   ├── ResultsStep.tsx       # Itemized cost breakdown
│   ├── StepsHeader.tsx       # Animated step progress indicator
│   ├── ButtonNavigation.tsx  # Back/Next navigation with step validation
│   └── ChatWidget.tsx        # Floating AI chat assistant
├── lib/
│   ├── pricing.ts            # Pricing logic and cost calculation
│   └── utils.ts              # Tailwind class utility (cn)
└── types.ts                  # Shared TypeScript interfaces and types
```

---

## Running Locally

### Prerequisites

- Node.js 18+
- A Google Maps API key with **Places API** and **Distance Matrix API** enabled
- An Anthropic API key

### Setup

```bash
# Clone the repo
git clone https://github.com/Louis-Rid/Container-Quote.git
cd Container-Quote

# Install dependencies
npm install

# Create your environment file
touch .env.local
```

Add the following to `.env.local`:

```
VITE_GOOGLE_PLACES_API=your_google_maps_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
```

```bash
# Start the dev server
npm run dev
```

---

## Architecture Notes

- **State management** — all form state lives in `App.tsx` and flows down as props. No external state library needed at this scale.
- **TypeScript** — all data shapes are defined in `types.ts` before any UI was built. `ContainerSize` is a union type; `QuoteForm` and `FormResults` are typed interfaces used throughout.
- **Distance calculation** — when both city coordinates are available, a `useEffect` fires the Distance Matrix API and stores the result in miles on the quote state. Pricing logic then uses this to calculate a realistic delivery fee.
- **GSAP animations** — step transitions use `useGSAP` with `contextSafe` to ensure proper React lifecycle cleanup. A `displayPosition` state separate from `position` allows content to swap mid-animation.
- **AI chat** — the floating chat widget calls the Anthropic API with a detailed system prompt describing the developer's background, making it a live interactive resume.

---

## About the Developer

**Louis Riddle** is a software engineer based in Wichita, KS with experience building and maintaining complex web applications across agencies and creative studios.

- 📧 <riddlelouis43@icloud.com>
- 🐙 [github.com/Louis-Rid](https://github.com/Louis-Rid)
