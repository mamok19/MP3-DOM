/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
let currPlayedSongId = 0;
let timer = 0;
setInterval(() => {
  if (currPlayedSongId){
    timer += 1;
    if (timer ===  getSongById(currPlayedSongId).duration){
      document.getElementById(currPlayedSongId).style.backgroundColor = null
    }
  }
}, 1000);
function playSong(songId) {
    timer = 0;
    if (currPlayedSongId)
        document.getElementById(currPlayedSongId).style.backgroundColor = null
    document.getElementById(songId).style.backgroundColor = 'green';
    currPlayedSongId = songId;
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const songEl = createElement("div",[], ["songs"], {})
    songEl.setAttribute('id', id);
    songEl.appendChild(createElement("h1", [title]))
    songEl.appendChild(createElement("span", [album]))
    songEl.appendChild(createElement("h2", [artist]))
    songEl.appendChild(createElement("p", [" duration: "+ fromSecondsToMinuts(duration)]))
    songEl.appendChild(createElement("img", [], [], {src: coverArt}))
    songEl.setAttribute('onclick', `playSong(${id})` )
    return songEl
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const playlistEl = createElement("div", [], ["playlists"], {})
    playlistEl.setAttribute('id', id);
    playlistEl.appendChild(createElement("h1", [name]))
    playlistEl.appendChild(createElement("h3", "songs :" + songs.length))
    playlistEl.appendChild(createElement("span",["  duration: " + fromSecondsToMinuts(playlistDuration(id))]))
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
for (let playlist of player.playlists){
    playlists.appendChild(createPlaylistElement(playlist));
}

// help functions
function fromSecondsToMinuts(time){
    const minuts = ('0' + Math.floor(time / 60)).slice(-2);
    const seconds = ('0'+ time%60).slice(-2)
    return (minuts + ':' + seconds)
}

function playlistDuration(id) {
    let sum = 0
    for (let i = 0; i < getPlaylistById(id).songs.length; i++) {
      sum += getSongById(getPlaylistById(id).songs[i]).duration
    }
    return sum
  }

  function getPlaylistById(playlistId) {
    for (let j = 0; j < player.playlists.length; j++) {
      if (player.playlists[j].id === playlistId) {
        return player.playlists[j]
      }
    }
    throw 'non-existent playlist ID'
  }

  function getSongById(songId) {
    for (let j = 0; j < player.songs.length; j++) {
      if (player.songs[j].id === songId) {
        return player.songs[j]
      }
    }
    throw 'non-existent song ID'
  }
  
  