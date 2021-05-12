// Imports
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import { MusicPlayer, useMusicContext } from "./Components/MusicContextProvider.jsx"
import { useThemeContext } from "./Components/ThemeContextProvider"
import TabBar, { Routes } from "./Components/TabBar"
import TopCharts from "./Components/TopCharts"
import Library from "./Components/Library"
import Profile from "./Components/Profile"

// App
function App() {
  const { themeState: { TopGradientColor, BottomGradientColor } } = useThemeContext()
  
  return (
    <Router>
      <div id="container">
        <div id="page-container"
        style={
          {background: `linear-gradient(${TopGradientColor}, ${BottomGradientColor})`} 
        }>
          
          <Switch>
            <Route path={Routes.music}>
              <Library />
            </Route>

            <Route path={Routes.profile}>
              <Profile />
            </Route>
            
            <Route path={Routes.search}>
              Discover new music
            </Route>

            <Route path={Routes.home}>
              <TopCharts />
            </Route>
          </Switch>
        </div>
        <MusicPlayer />
        <TabBar />
      </div>
    </Router>
  )
}

export default App;