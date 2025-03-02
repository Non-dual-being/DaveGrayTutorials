import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import store from './Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <StoreProvider store={store}>
          <App />
        </StoreProvider> 
    </Router>
  </StrictMode>
)
