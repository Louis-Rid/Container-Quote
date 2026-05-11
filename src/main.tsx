import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { APIProvider } from '@vis.gl/react-google-maps'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_PLACES_API}>
      <App />
    </APIProvider>
  </StrictMode>,
)
