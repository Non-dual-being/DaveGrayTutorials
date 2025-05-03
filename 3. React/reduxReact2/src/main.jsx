import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  { store } from "./app/store.jsx"
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/userSlice.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


store.dispatch(fetchUsers());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)


/**
 * Routes is een container die kijkt naar welke pad in de url overeenkomt met welke route
 * Route koppelt een url patroon of path met een element
 * bij elk patroon met begin met de / wordt de app geladen
 * dus bij /about wordt app geladen
 * 
 */