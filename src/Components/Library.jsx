import { useMusicContext } from "./MusicContextProvider"

export default function Library() {
    const { songs, albums, artists } = useMusicContext()

    return (
        <div id="library">
            
        </div>
    )
}