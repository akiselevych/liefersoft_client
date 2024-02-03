import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import './styles/global.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="page">
        <LoginForm/>
    </div>
  </React.StrictMode>,
)
