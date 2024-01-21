import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AdmiContextProvider from './components/common/AdmiContext.jsx'
import { AuthContextProvider } from './components/common/AuthContext.jsx'
//
//import { AuthProvider } from './components/common/AuthContext.jsx'
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <AdmiContextProvider>
    <App />
    </AdmiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  
)
