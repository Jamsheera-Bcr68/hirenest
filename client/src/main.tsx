import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import {store} from './redux/store.ts'

import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>
)
