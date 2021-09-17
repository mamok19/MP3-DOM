/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 let currPlayedSongId = 0
 let timer = 0
 setInterval(() => {
     if (currPlayedSongId) {
         timer += 1
         if (timer === getSongById(parseInt(currPlayedSongId)).duration) {
             if (document.getElementById(currPlayedSongId).nextSibling === null) {
                 document.getElementById(currPlayedSongId).style.backgroundColor = null
                 currPlayedSongId = 0
                 timer = 0
             } else {
                 document.getElementById(currPlayedSongId).style.backgroundColor = null
                 currPlayedSongId = document.getElementById(currPlayedSongId).nextSibling.id
                 playSong(currPlayedSongId)
             }
         }
     }
 }, 1000)
 function playSong(songId) {
     timer = 0
     if (currPlayedSongId) document.getElementById(currPlayedSongId).style.backgroundColor = null
     document.getElementById(songId).style.backgroundColor = "green"
     currPlayedSongId = songId
 }

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    player.songs.push({createSongElement(title, album, artist, duration, coverArt )})
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const songEl = createElement("div", [], ["songs"], {})
    songEl.setAttribute("id", id)
    songEl.appendChild(createElement("h1", [title]))
    songEl.appendChild(createElement("span", [album]))
    songEl.appendChild(createElement("h2", [artist]))
    songEl.appendChild(
        createElement("p", [" duration " + fromSecondsToMinuts(duration)], ["duration"], {
            style: `background-color:${changeColorByDuration(duration)};`,
        })
    )
    songEl.appendChild(createElement("img", [], [], { src: coverArt }))
    songEl.setAttribute("onclick", `playSong(${id})`)
    return songEl
}
/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const playlistEl = createElement("div", [], ["playlists"], {})
    playlistEl.setAttribute("id", id)
    playlistEl.appendChild(createElement("h1", [name]))
    playlistEl.appendChild(createElement("h3", "songs :" + songs.length))
    playlistEl.appendChild(createElement("span", ["  duration: " + fromSecondsToMinuts(playlistDuration(id))]))
    return playlistEl
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
 function createElement(tagName, children = [], classes = [], attributes = {}) {
    Elemen = document.createElement(tagName)

    //add children
    for (let child of children) {
        if (typeof child === "string" || typeof child === "number") {
            child = document.createTextNode(child)
        }
        Elemen.appendChild(child)
    }
    //add classes
    for (const cls of classes) {
        Elemen.classList.add(cls)
    }
    //add attributes
    for (const attribute in attributes) {
        Elemen.setAttribute(attribute, attributes[attribute])
    }
    return Elemen
}
/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songs = document.getElementById("songs")
    for (const song of player.songs) {
        songs.appendChild(createSongElement(song))
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    const playlists = document.getElementById("playlists")
    for (let playlist of player.playlists) {
        playlists.appendChild(createPlaylistElement(playlist))
    }
    
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

//help functions

function fromSecondsToMinuts(time) {
    const minuts = ("0" + Math.floor(time / 60)).slice(-2)
    const seconds = ("0" + (time % 60)).slice(-2)
    return minuts + ":" + seconds
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
    throw "non-existent playlist ID"
}

function getSongById(songId) {
    for (let j = 0; j < player.songs.length; j++) {
        if (player.songs[j].id === songId) {
            return player.songs[j]
        }
    }
    throw "non-existent song ID"
}

function changeColorByDuration(duration) {
    let red = 0
    let green = 0
    if (duration < 120) {
        green = 255
        return `rgb(${red},${green},0)`
    } else if (duration > 420) {
        red = 255
        return `rgb(${red},${green},0)`
    } else {
        red = (duration / 255) * 100
        green = 255 - red
        return `rgb(${red},${green},120)`
    }
}

function genarateIDPlaylist() {
    for (let i = 1; i < player.playlists.length + 1; i++) {
      let flag = true
      for (let j = 0; j < player.playlists.length; j++) {
        if (player.playlists[j].id === i) {
          flag = false
          break
        }
      }
      if (flag) {
        return i
      }
    }
  }

  function genarateIDSongs() {
    for (let i = 1; i < player.songs.length + 1; i++) {
      let flag = true
      for (let j = 0; j < player.songs.length; j++) {
        if (player.songs[j].id === i) {
          flag = false
          break
        }
      }
      if (flag) {
        return i
      }
    }
  }

