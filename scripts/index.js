/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    console.log("chefeer")
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const songEl = document.createElement("div", [], [], {})
    songEl.setAttribute('id', id);
    songEl.appendChild(createElement("h1", [title]))
    songEl.appendChild(createElement("span", [album]))
    songEl.appendChild(createElement("span", [artist]))
    songEl.appendChild(createElement("span", [" duration: "+ duration]))
    songEl.appendChild(createElement("img", [], [], {src: coverArt}))

    songEl.setAttribute('onclick', `playSong(${id})` )
    return songEl
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const playlistEl = document.createElement("div", [], [], {})
    playlistEl.setAttribute('id', id);
    playlistEl.appendChild(createElement("h1", [name]))
    playlistEl.appendChild(createElement("span", songs))
    return playlistEl
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    Elemen = document.createElement(tagName);

    //add children
    for (let child of children) {
        if (typeof child === "string" || typeof child === "number"){
            child = document.createTextNode(child);
        }
            Elemen.appendChild(child);
    }
    //add classes
    for (const cls of classes) {
        Elemen.classList.add(cls);
    }
    //add attributes
    for (const attribute in attributes) {
        Elemen.setAttribute(attribute, attributes[attribute]); 
    }
    return Elemen
}

// You can write more code below this line
const songs = document.getElementById("songs")
const playlists = document.getElementById("playlists")
for (const song of player.songs){
    songs.appendChild(createSongElement(song));
}
for (const playlist of player.playlists){
    console.log(playlist);
    playlists.appendChild(createPlaylistElement(playlist));
}