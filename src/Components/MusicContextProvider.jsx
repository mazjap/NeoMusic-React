import Hidden from "../Hidden"
import { useContext, useState, createContext } from "react"
import { useQuery, useQueries } from 'react-query'
import { useThemeContext } from "./ThemeContextProvider"

import Logo from "../imgs/logo.png"
import Backward from "../imgs/backward.png"
import Forward from "../imgs/forward.png"
import Pause from "../imgs/pause.png"
import Play from "../imgs/play.png"

const defaultState = {}

const MusicContext = createContext(defaultState)

document.addEventListener("mediaItemDidChange", () => {
    console.log(MusicController.shared.currentSong())
})

document.addEventListener("musickitloaded", () => {
    console.log("event listener was called. Configuring musickit")
    window.MusicKit.configure({
        // I lied, it works
        developerToken: Hidden.appleMusicAPIKey,
        app: {
            name: "NeoMusic.JS",
            build: '2021.05.11'
        }
    })
    console.log("resolving musickit within promise")
    let musicKit = window.MusicKit.getInstance()
    musicKit.authorize()
    MusicController.shared.mk = musicKit
    console.log("Big success")
})

class MusicController {
    // Musickit.api.song/album/artist (takes an id or an array of ids: String/[String])
    // Musickit.api.library.song/album/artist (using song/album/artist id(s): String/[String])
    // Musickit.api.search (takes an object containing term: String, types: [String])
    // Musickit.api.library.search (takes an object containing { term: String, type(s): String/[String] } )
    constructor() {
        // const setupMusicKit = new Promise((resolve) => {
        //     console.log("setting up promise")
        //     document.addEventListener("musickitloaded", () => {
        //         console.log("event listener was called. Configuring musickit")
        //         window.MusicKit.configure({
        //             developerToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc0N1ZHMzlWSFUifQ.eyJpYXQiOjE2MTk2MjUwMDYsImV4cCI6MTYzNTE3NzAwNiwiaXNzIjoiSEZSOEY0QlQ3RSJ9.W8BFPgoEKuZHwr_y_xHFwe08Bi_1Jve4EreKOufCHXXjZ8NY9T8ZonZzLydNcnNXmR4vsiG9NDniQx4unWR91A",
        //             app: {
        //                 name: "NeoMusic.JS",
        //                 build: '2021.05.11'
        //             }
        //         })
        //         console.log("resolving musickit within promise")
        //         resolve(window.MusicKit.getInstance())
        //     })
        // })

        // setupMusicKit.then((musicKit) => {
        //     musicKit.authorize()
        //     MusicController.shared.mk = musicKit
        //     console.log("Big success")
        // }).catch((error) => {
        //     console.log("Big fail")
        //     alert("Unable to create musickit instance", error)
        // })
    }

    static shared = new MusicController()

    async play() {
        try {
            await this.mk?.play()
        } catch(e) {
            this._alertMKError("Unable to play music.")
        }
    }

    async pause() {
        // Do not authorize to pause
        try {
            await this.mk?.pause()
        } catch(e) {
            this._alertMKError("Unable to pause music.")
        }
    }

    async skipForward() {
        try {
            if (this.mk) {
                await this.mk.player.skipToNextItem()
            } else {
                this._alertMKError("MusicKit was not properly initialized")
            }
        } catch(e) {
            this._alertMKError("Unable to skip backwards.", e)
            throw e
        }
    }

    async skipBackward() {
        try {
            if (this.mk) {
                await this.mk?.player?.skipToPreviousItem()
            } else {
                this._alertMKError("MusicKit was not properly initialized")
            }
        } catch(e) {
            this._alertMKError("Unable to skip backwards.", e)
        }
    }

    async stop() {
        // No need to check authorization when stopping playback
        try {
            this.mk.player.stop()
        } catch(e) {
            this._alertMKError("Unable to stop music.", e)
        }
    }

    async enqueue(collection) {
        this.mk.authorize().then(() => {
            return this.mk.enqueue(collection) 
        }).then(() => {
            this.play()
        }).catch(() => {
            this._alertMKError(`Unable to enqueue collection: ${collection}`)
        })
    }

    async setQueue(collection) {
        try {
            await this.mk.setQueue(collection)
            await this.play()
        } catch(e) {
            this._alertMKError("Unable to set queue to collection:", collection)
        }
    }

    songs() {
        return this.mk?.api.library.songs()
        // try {
        //     console.log("songs: " + await this.mk?.api?.library?.songs() ?? [])
        //     return await this.mk?.api.library.songs() || []
        // } catch(e) {
        //     this._alertMKError("Unable to fetch songs", e)
        //     return []
        // }
    }

    albums() {
        return this.mk?.api.library.albums() ?? []
    }

    artists() {
        return this.mk?.api.library.artists() ?? []
    }

    queue() {
        return this.mk?.player.queue ?? []
    }

    isPlaying() {
        return this.mk?.player.isPlaying ?? false
    }

    currentSong() {
        return this.mk?.player?.nowPlayingItem ?? {title: "No Song Selected"}
    }

    currentSongIndex() {
        return this.mk?.player?.nowPlayingItemIndex
    }

    _alertMKError(message, error) {
        alert(message + "\nMusicKit could not be found.\n" + error)
    }
}

export const useMusicContext = () => {
    return useContext(MusicContext)
}

export function MusicPlayer() {
    // Render small version first, worry about large version and transistion animations later
    const { themeState: { TopGradientColor, BottomGradientColor, TextColor } } = useThemeContext()
    const { nowPlayingItem, isPlaying, togglePlayStatus, skipToNextSong, skipToPreviousSong, setQueue } = useMusicContext()

    // Static styling goes in css files whereas dynamic styling goes in jsx
    const textStyle = {
        color: TextColor,
    }

    const buttonStyle = {
        ...textStyle,
        background: `linear-gradient(${ BottomGradientColor }, ${ TopGradientColor })`
    }
    
    return (
        <div id="music-player-container" 
        style={
            {background: `linear-gradient(${TopGradientColor}, ${BottomGradientColor})`}
        }>
            <div id="music-info">
                <h3 style={ textStyle } id="song-title">{ nowPlayingItem.title }</h3>
                <img id="album-artwork" src={ nowPlayingItem.artworkURL ?? Logo } alt="Current song's album artwork"></img>
            </div>
            <div id="music-controls">
                <button id="skip-back" onClick={ skipToNextSong } style={ buttonStyle } >
                    <img src={ Backward } alt="skip backward" />
                </button>
                <button id="pause-play" onClick={ togglePlayStatus } style={ buttonStyle } >
                    <img src={ isPlaying ? Pause : Play } alt="toggle play" />
                </button>
                <button id="skip-forward" onClick={ setQueue } style={ buttonStyle } >
                    <img src={ Forward } alt="skip forward" />
                </button>
            </div>
        </div>
    )
}

const MusicContextProvider = ({children}) => {
    const musicController = MusicController.shared
    const [ nowPlayingItem, setNowPlayingItem ] = useState(musicController.currentSong())
    const [ queue, setQueueAction ] = useState(musicController.queue())
    const [ isPlaying, setIsPlaying ] = useState(musicController.isPlaying())
    // const [{ isLoadingSongs, refetchSongs, data: songs = [] },  
    //        { isLoadingAlbums, refetchAlbums, data: albums = [] }, 
    //        { isLoadingArtists, refetchArtists, data: artists = [] }] = useQueries([
    //            { queryKey: 'songs', queryFn: () => musicController.songs() },
    //            { queryKey: 'albums', queryFn: () => musicController.albums() },
    //            { queryKey: 'artists', queryFn: () => musicController.artists() }
    //         ])
    const { isLoadingSongs, refetchSongs, data: songs = [] } = useQuery('songs', musicController.songs)
    const { isLoadingAlbums, refetchAlbums, data: albums = [] } = useQuery('albums', musicController.albums)
    const { isLoadingArtists, refetchArtists, data: artists = [] } = useQuery('artists', musicController.artists)

    return (
        <MusicContext.Provider value={{
            nowPlayingItem,
            isPlaying: musicController.isPlaying(),
            queue,
            isLoadingSongs,
            songs,
            refetchSongs,
            isLoadingAlbums,
            albums,
            refetchAlbums,
            isLoadingArtists,
            artists,
            refetchArtists,
            togglePlayStatus: async () => {
                await (isPlaying ? musicController.pause() : musicController.play())
                setIsPlaying(musicController.isPlaying())
            },
            skipToNextSong: async () => {
                await musicController.skipForward()
                setNowPlayingItem(musicController.currentSong())
            },
            skipToPreviousSong: async () => {
                await musicController.skipBackward()
                setNowPlayingItem(musicController.currentSong())
            },
            setQueue: async (queueObj) => {
                console.log(queueObj)
                await musicController.setQueue(queueObj)
                setQueueAction(musicController.queue())
                setNowPlayingItem(musicController.currentSong())
                setIsPlaying(musicController.isPlaying())
            },
            enqueue: async (queueObj) => {
                await musicController.enqueue(queueObj)
                setQueueAction(musicController.queue)
                setNowPlayingItem(musicController.currentSong())
                setIsPlaying(musicController.isPlaying())
            }
        }}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider