const jwt = null; // Or the user's saved JWT, in this case we don't have one
let ws;

// Global variables for the duration of the current song that is playing
var currentSongDuration;
var tempSongDuration;

// Helper function for checking if an array does not exist, is not an array, or is empty
// Returns true if the array exists, otherwise returns false
function canReadArray(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return false;
    }
    return true;
}

class SocketConnection {
    constructor() {
        this.sendHeartbeat = null;
        this.websocketConnection();
    }

    heartbeat(websocket, ms) {
        this.sendHeartbeat = setInterval(() => {
            websocket.send(JSON.stringify({ op: 9 }));
        }, ms);
    }

    websocketConnection() {
        if (ws) {
            ws.close();
            ws = null;
        }
        ws = new WebSocket('wss://listen.moe/gateway_v2');
        ws.onopen = () => {
            clearInterval(this.sendHeartbeat);
            const token = jwt ? `Bearer ${jwt}` : '';
            ws.send(JSON.stringify({ op: 0, d: { auth: token } }));
        };
        ws.onmessage = message => {
            if (!message.data.length) return;
            try {
                var response = JSON.parse(message.data);
            } catch (error) {
                return;
            }
            if (response.op === 0) return this.heartbeat(ws, response.d.heartbeat);
            if (response.op === 1) {
                if (response.t !== 'TRACK_UPDATE' &&
                    response.t !== 'TRACK_UPDATE_REQUEST' &&
                    response.t !== 'QUEUE_UPDATE') return;

                const data = response.d;


                console.log(data)
                    //https://cdn.listen.moe/covers/
                    // Variables for the tags of current song playing and artist name
                var nowPlaying = document.getElementById("now-playing");
                var artistLbl = document.getElementById("artist");

                // Code for updating the song title
                var hasSongTitle = data.song.title !== undefined && data.song.title !== null;
                var song = "";

                $('[id="song-title"]').text(data.song.title)

                // Code for updating the artist name 
                var artists = "";
                if (canReadArray(data.song.artists) && data.song.artists.length > 1) {
                    for (var i = 0; i < data.song.artists.length; i++) {
                        var hasArtistNameRomaji = data.song.artists[i].nameRomaji !== undefined && data.song.artists[i].nameRomaji !== null;
                        var hasArtistName = data.song.artists[i].name !== undefined && data.song.artists[i].name !== null;

                        if (hasArtistNameRomaji) {
                            artists += data.song.artists[i].nameRomaji + ", ";
                        } else if (hasArtistName) {
                            artists += data.song.artists[i].name + ", ";
                        } else {
                            artists += "No data" + ", ";
                        }
                    }
                    artists = artists.substr(0, artists.length - 2);
                } else if (canReadArray(data.song.artists)) {
                    if (data.song.artists[0].nameRomaji !== undefined && data.song.artists[0].nameRomaji !== null) {
                        artists = data.song.artists[0].nameRomaji;
                    } else if (data.song.artists[0].name !== undefined && data.song.artists[0].name !== null) {
                        artists = data.song.artists[0].name;
                    } else {
                        artists = "No data";
                    }
                } else {
                    artists = "No data";
                }
                artistLbl.innerHTML = artists;

                // Change website title to include current playing song + artist
                // Note that if we have a song source then we don't want to include it, therefore we use data.song.title
                if (song !== "No data" && artists !== "No data") {
                    document.title = data.song.title + " by " + artists + " | Anone, anone! ~";
                } else if (song !== "No data") {
                    document.title = data.song.title + " | Anone, anone! ~";
                } else {
                    document.title = "Anone, anone! ~";
                }
                if (data.song.albums[0].image == null) {
                    if (data.song.artists[0].image == null) {

                        $('[id="song-pic"]').css('background-image', 'url(/images/cat.gif)')

                    } else {
                        console.log(data.song.artists[0].image)
                        $('[id="song-pic"]').css('background-image', 'url(https://cdn.listen.moe/artists/' + data.song.artists[0].image + ')')
                    }

                } else {
                    console.log(data.song.albums[0].image)
                    $('[id="song-pic"]').css('background-image', 'url(https://cdn.listen.moe/covers/' + data.song.albums[0].image + ')')
                }

            }
        };
    }
}

const socket = new SocketConnection();

// Variables for checking if user navigated from iOS or iOS-Safari
var ua = window.navigator.userAgent;
var webkit = !!ua.match(/WebKit/i);


// URL link to the raw audio stream, declared outside function so it becomes global
var OriginalSourceUrl = "";

// Wait until document has finished loading before initializing our variables
document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);

function startplayer() {
    player = document.getElementById("music-player");
    // Volume slider stuff
    volumeSlider = document.getElementById("volumeSlider");
    volumeSlider.value = getSavedValue("volumeSlider"); // Get the saved value of the volume control
    changeVolBarColor();
    change_vol();
}

// Music player functions

$(document).on("click", '#playPause', function() {
    if (player.currentTime > 0 && !player.paused && !player.ended && player.readyState > 2) {
        pause_aud();
        // playPauseIcon.setAttribute("class", "fas fa-play");
    } else {
        play_aud();
        //playPauseIcon.setAttribute("class", "fas fa-pause");
    }
});

function play_aud() {
    if ($('[id="audioSource"]').attr("src") == 0) {
        $('[id="audioSource"]').attr("src", 'https://listen.moe/stream');
        player.load();
    }
    player.play();
    $('[id="playPause"]').html('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1z"/></svg>')
}

function pause_aud() {
    $('[id="audioSource"]').attr("src", '');
    player.pause();
    setTimeout(function() {
        player.load();
    });
    $('[id="playPause"]').html('<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,14.67V9.33c0-0.79,0.88-1.27,1.54-0.84 l4.15,2.67c0.61,0.39,0.61,1.29,0,1.68l-4.15,2.67C10.38,15.94,9.5,15.46,9.5,14.67z"/></g></svg>')
}



function change_vol() {
    player.volume = volumeSlider.value;
}

//volumeSlider.addEventListener("input", function() {
//  player.volume = volumeSlider.value;
//changeVolBarColor();
// saveValue(volumeSlider);
//});

// Used when the stored value is loaded
function changeVolBarColor() {
    var string1 = "linear-gradient(to right, #ff015b 0%, #ff015b ";
    var string2 = "%, #fff ";
    var string3 = "%, #fff 100%)";
    var combinedString = string1 + volumeSlider.value * 100 + string2 + volumeSlider.value * 100 + string3;
    volumeSlider.style.background = combinedString;
}

// Functions for remembering what volume value the user has setted
function saveValue(e) {
    var id = e.id; // get the sender's id to save it
    var val = e.value; // get the value
    localStorage.setItem(id, val); // Everytime the volume changes, save the value
}

// Return the value of "v" from localStorage
function getSavedValue(v) {
    if (localStorage.getItem(v) === null) {
        return "0.7"; // default value
    }
    return localStorage.getItem(v);
}

// Function for resetting the audio stream so we're in sync with the radio
function resetAudioStream() {
    progressBar.style.width = "0%";
    pause_aud();
    player.currentTime = 0;
    setTimeout(function() {
        play_aud();
    }, 150);
}