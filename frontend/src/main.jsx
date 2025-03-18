import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StudentStoreContextProvider from './context/StudentStoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>

<StudentStoreContextProvider>
     <App />
</StudentStoreContextProvider>
 
</BrowserRouter>

)
