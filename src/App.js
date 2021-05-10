// Imports
import './App.css';
import MusicPlayer from "./Music"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext, createContext } from "react"

// Images
import house from "./imgs/house.png"
import musicNotes from "./imgs/music-notes.png"
import person from "./imgs/person.png"
import magnifyingGlass from "./imgs/magnifying-glass.png"


export const ThemeContext = createContext({})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

const themes = {
  light: {
    "Top Gradient Color": "#"
  }
}

// App
function App() {
  let colorSchemeFragments = ["Top Gradient Color", "Bottom Gradient Color", "Text Color"]

  return (
    <Router>
      <div id="container">
        <div id="page-container">
          <Switch>
            <Route path={Routes.music}>
              <div id="library">
                <h3 class="title">Library</h3>
                {/* songs.map {  } */}
              </div>
            </Route>

            <Route path={Routes.profile}>
              <div id="profile">
                <h3 class="title">Settings</h3>
                <ul id="colorSchemeOptions">
                  { 
                    colorSchemeFragments.map((name) => {
                      return (
                        <li class="colorPicker">
                          <p class="colorText">{name}</p>
                          <input type="text"></input>
                        </li>
                      )
                    }) 
                  }
                </ul>
              </div>
            </Route>
            
            <Route path={Routes.search}>
              Discover new music
            </Route>

            <Route path={Routes.home}>
              Home content
            </Route>
          </Switch>
        </div>
        <MusicPlayer />
        <TabBar />
      </div>
    </Router>
  )
}

// TabBar
function TabBar() {
  return (
    <div id="tabbar">
      <ul>
        <li>
          <Link to={Routes.home}>
            <p className="tab-label">Home</p>
            <img className="tab-icon" src={house} alt="home"></img>
          </Link>
        </li>
        <li>
          <Link to={Routes.music}>
            <p className="tab-label">Music</p>
            <img className="tab-icon" src={musicNotes} alt="music notes"></img>
          </Link>
        </li>
        <li>
          <Link to={Routes.search}>
            <p className="tab-label">Search</p>
            <img className="tab-icon" src={magnifyingGlass} alt="magnifying glass"></img>
          </Link>
        </li>
        <li>
          <Link to={Routes.profile}>
            <p className="tab-label">Account</p>
            <img className="tab-icon" src={person} alt="radio"></img>
          </Link>
        </li>
      </ul>
    </div>
  )
}

// Routes
const Routes = Object.freeze({
  home: "/",
  music: "/library",
  search: "/discover",
  profile: "/profile"
})

export default App;
