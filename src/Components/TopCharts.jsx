// import { useMusicContext } from "./MusicContextProvider"
import { useQuery } from "react-query"
import { useMusicContext } from "./MusicContextProvider"
import { useThemeContext } from "./ThemeContextProvider"
import Api from "../Api"
import Song from "./Song"

// Fetches and displays Apple Music's top 20 songs
export default function TopCharts() {
    const { isLoading, refetch, data } = useQuery("top-charts", Api.fetchCharts)
    const { setQueue } = useMusicContext()
    const { themeState } = useThemeContext()

    const textStyle = {
        color: themeState.TextColor
    }

    return (
        <div id="song-library-list">
            <h3 style={ textStyle } className="title">Top Charts</h3>
            {
                isLoading
                ? <p>Loading</p>
                : (data.results?.songs[0].data ?? []).map((song) => <Song key={ song.id } song={ song } isLoading={ isLoading } setQueue={ setQueue } />)
            }
        </div>
    )
}
