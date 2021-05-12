// import { useMusicContext } from "./MusicContextProvider"
import Hidden from "../Hidden"
import { useQuery } from "react-query"
import { useMusicContext } from "./MusicContextProvider"
import Api from "../Api"

// Fetches and displays Apple Music's top 20 songs
export default function TopCharts() {
    const { isLoading, refetch, data } = useQuery("top-charts", Api.fetchCharts)
    const { setQueue } = useMusicContext()
    
    const SongComponent = (props) => {
        const { song } = props
        const artworkInfo = song.attributes.artwork
        const artworkSize = "128"
        const formattedURL = artworkInfo.url.replace("{w}", artworkSize).replace("{h}", artworkSize)

        return (
            isLoading
            ? <p>Loading</p>
            : (
                <div className="song-container" onClick={ () => {
                    console.log(song.id)
                    setQueue({ song: song.id })
                } }>
                    <img src={ formattedURL } alt={ song.attributes.name + " artwork" } />
                    <h5 className="song-title">{song.attributes.name}</h5>
                </div>
            )
        )
    }

    return (
        <div id="song-library-list">
            {
                isLoading
                ? <p>Loading</p>
                : (data.results?.songs[0].data ?? []).map((song) => <SongComponent key={song.id} song={song} />) 
            }
        </div>
    )
}
