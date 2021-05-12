export default function Song(props) {
    const { song, isLoading, setQueue } = props
    const artworkInfo = song.attributes.artwork
    const artworkSize = "128"
    const formattedURL = artworkInfo.url.replace("{w}", artworkSize).replace("{h}", artworkSize)
    console.log(song)

    return (
        isLoading ?? false
        ? <p>Loading</p>
        : (
            <div className="song-container" onClick={ () => {
                setQueue({ song: song.id })
            } }>
                <img src={ formattedURL } alt={ song.attributes.name + " artwork" } />
                <h5 className="song-title">{song.attributes.name}</h5>
            </div>
        )
    )
}