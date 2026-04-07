import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { sellerStore } from './store'
import App from './App'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={sellerStore}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)