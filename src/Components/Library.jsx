import { useMusicContext } from "./MusicContextProvider"
import { useThemeContext } from "./ThemeContextProvider"
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom"
import SongComponent from "./Song"

export default function Library() {
    const { songs, albums, artists, setQueue } = useMusicContext()
    const { themeState: { TextColor } } = useThemeContext()
    let match = useRouteMatch()

    const textStyle = {
        color: TextColor
    }

    const mediaComponents = [
        { 
            name: "Songs",
            route: "/songs"
        },
        { 
            name: "Albums", 
            route: "/albums"
        },
        {
            name: "Artists",
            route: "/artists"
        }
    ]

    // Nested routes :)
    return (
        <Router>
            <Switch>
                <Route path={match.url + "/songs"}>
                    <Songs songs={ songs } setQueue={ setQueue } />
                </Route>
                <Route path={match.url + "/albums"}>
                    <Albums albums={ albums } setQueue={ setQueue } />
                </Route>
                <Route path={match.url + "/artists"}>
                    <Artists artists={ artists } setQueue={ setQueue } />
                </Route>
                <Route path="/">
                    <div id="library">
                        <h3>Library</h3>
                        <ul className="media-list">
                            { mediaComponents.map((obj) => <li style={ textStyle } key={ obj.route } ><Link to={ match.url + obj.route }>{ obj.name }</Link></li>) }
                        </ul>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

function Songs(props) {
    const { songs, setQueue } = props
    console.log(songs)
    
    return (
        <div>
            { songs.map((song) => <SongComponent key={ song.id } song={ song } setQueue={ setQueue } isLoading={ false } /> ) }
        </div>
    )
}

function Albums(props) {
    const [ albums, setQueue ] = props
}

function Artists(props) {
    const [ artists, setQueue ] = props
}
