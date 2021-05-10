import Hidden from "./Hidden"
import { useContext, createContext } from "react"

export const MusicContext = createContext({})

export const useMusicContext = () => {
    return useContext(MusicContext)
}

const defaultState = {}

export const GlobalActionTypes = Object.freeze({
    changeNowPlaying: "ChangeNowPlayingTo",
    removeUnreadMessage: ""
})

function globalReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case GlobalActionTypes.addUnreadMessage:
            return {
                ...state,
                unreadMessages: [...state.unreadMessages, payload]
            };
        case GlobalActionTypes.removeUnreadMessage:
            const newState = {...state};
            const foundMessage = newState.unreadMessages.findIndex(({ id }) => id === payload)
            newState.unreadMessages.splice(foundMessage, 1);
            return newState;
        default:
            throw Error('Incorrect action type.')
    }
}

class MusicController {
    constructor() {
        const musicKit = window.MusicKit
        musicKit.configure({
            developerToken: Hidden.appleMusicAPIKey,
            app: {
                name: "NeoMusic.js",
                build: "b1.0"
            }
        })

        const instance = window.MusicKit.getInstance()
        instance.authorize()
        this.mk = instance
    }

    play() {
        if (this.isFunctional()) {
            this.mk.play()
        } else {
            this._alertMKError("Unable to play music.")
        }
    }

    pause() {
        if (this.isFunctional()) {
            this.mk.pause()
        } else {
            this._alertMKError("Unable to pause music.")
        }
    }

    stop() {
        if (this.isFunctional()) {
            this.mk.stop()
        } else {
            this._alertMKError("Unable to stop music.")
        }
    }

    enqueue(collection) {
        for (const item of collection) {
            this.mk.enqueue(item)
        }
    }

    isPlaying() {
        return Boolean(this.mk.isPlaying)
    }

    isFunctional() {
        return Boolean(this.mk)
    }

    currentSong() {
        return this.mk
    }

    _alertMKError(error) {
        alert(error + "\nMusicKit could not be found.")
    }
}

export default function MusicPlayer(props) {
    // Render small version first, worry about large version and transistion animations later


    return (
        <div id="music-player-container">
            <img id="album-artwork" src={ props.mk?.currentSong()?.albumArtwork } alt="Current song's album artwork"></img>
            <h3 id="song-title"></h3>
            {/* <div id="music-controls"> */}
                {/* <button id="skip-back" onClick={ this. }></button> */}
                {/* <button id="pause-play" onClick={ () => this.isPlaying() ? this.pause() : this.play() }></button> */}
                {/* <button id="skip-forward" onClick={  }></button> */}
            {/* </div> */}
        </div>
    )
}