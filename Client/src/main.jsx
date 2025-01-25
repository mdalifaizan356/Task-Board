// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContextProvider from '../src/ContextProvider/UserContextProvider';
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store.js"

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={Store}>
    {/* <UserContextProvider> */}
    <App />
  {/* </UserContextProvider> */}
  </Provider>
  // </StrictMode>,
)
 