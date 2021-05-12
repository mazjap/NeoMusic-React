import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import MusicContextProvider from "./Components/MusicContextProvider.jsx"
import ThemeContextProvider from "./Components/ThemeContextProvider"


// ReactDOM.render takes two arguments: (Custom XML dom element, element node)
ReactDOM.render(
  (<React.StrictMode>
    <ThemeContextProvider>
      <MusicContextProvider>
        <App />
      </MusicContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
