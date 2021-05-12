// Imports
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import TabBar, { Routes } from "./Components/TabBar"
import Profile from "./Components/Profile"
import { MusicPlayer, useMusicContext } from "./Components/MusicContextProvider.jsx"
import { useThemeContext } from "./Components/ThemeContextProvider"
import TopCharts from "./Components/TopCharts"

// App
function App() {
  const { themeState, setTheme, updateTheme, theme } = useThemeContext()
  const { TopGradientColor, BottomGradientColor } = themeState
  
  return (
    <Router>
      <div id="container">
        <div id="page-container"
        style={
          {background: `linear-gradient(${TopGradientColor}, ${BottomGradientColor})`} 
        }>
          
          <Switch>
            <Route path={Routes.music}>
              <div id="library">
                <h3 className="title">Library</h3>
                {/* songs.map {  } */}
              </div>
            </Route>

            <Route path={Routes.profile}>
              <Profile theme={theme} setTheme={setTheme} themeState={themeState} updateTheme={updateTheme} />
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