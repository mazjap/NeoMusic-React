import { Link } from "react-router-dom"
import { useThemeContext } from "./ThemeContextProvider"

// Images
import house from "../imgs/house.png"
import musicNotes from "../imgs/music-notes.png"
import person from "../imgs/person.png"
import magnifyingGlass from "../imgs/magnifying-glass.png"

// TabBar
export default function TabBar() {
    const { themeState: { BottomGradientColor, TextColor} } = useThemeContext()

    const textStyle = {
      color: TextColor
    }

    return (
      <div id="tabbar" style=
      {
        { background: BottomGradientColor }
      }>
        <ul>
          <li>
            <Link to={ Routes.home }>
              <p style={ textStyle } className="tab-label">Home</p>
              <img className="tab-icon" src={ house } alt="home"></img>
            </Link>
          </li>
          <li>
            <Link to={ Routes.music }>
              <p style={ textStyle } className="tab-label">Music</p>
              <img className="tab-icon" src={ musicNotes } alt="music notes"></img>
            </Link>
          </li>
          <li>
            <Link to={ Routes.search }>
              <p style={ textStyle } className="tab-label">Search</p>
              <img className="tab-icon" src={ magnifyingGlass } alt="magnifying glass"></img>
            </Link>
          </li>
          <li>
            <Link to={ Routes.profile }>
              <p style={ textStyle } className="tab-label">Account</p>
              <img className="tab-icon" src={ person } alt="radio"></img>
            </Link>
          </li>
        </ul>
      </div>
    )
  }

// Routes
export const Routes = Object.freeze({
    home: "/",
    music: "/library",
    search: "/discover",
    profile: "/profile"
})