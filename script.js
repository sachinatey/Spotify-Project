console.log("Welcome to Spotify...")

// Initialize the variables

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songNameDisplay = document.getElementById('songNameDisplay');
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
// let container = document.getElementsByClassName('container');
let container = document.getElementById('container')


let songs = [
    { songsName: "Mortals.", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songsName: "On & On", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songsName: "For The Record", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songsName: "Fearless", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songsName: "Faded", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songsName: "Teenage Lullaby", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songsName: "Tei Ooyy", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songsName: "Ark", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songsName: "Matafaka", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songsName;
})


// Handle Play/Pause Event
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlay();
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        audioElement.pause();
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused) {
            if (audioElement.paused) {

                makeAllPlay();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songIndex}.mp3`;
                songNameDisplay.innerText = songs[songIndex - 1].songsName;
                audioElement.play()
                masterPlay.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                gif.style.opacity = 1;
                container.style.backgroundImage = `url('covers/${songIndex}.jpg')`;

            }
            else {
                e.target.classList.add('fa-play-circle');
                e.target.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                makeAllPlay();
            }
        }
        else {
            if (audioElement.play()) {
                e.target.classList.add('fa-play-circle');
                e.target.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                makeAllPlay();
            }
            else {
                makeAllPlay();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songIndex}.mp3`;
                songNameDisplay.innerText = songs[songIndex - 1].songsName;
                audioElement.play()
                masterPlay.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                gif.style.opacity = 1;
            }
        }
    })
})



document.getElementById('backward').addEventListener('click', () => {
    if (songIndex < 1) {
        songIndex = 9
    }
    else {
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    songNameDisplay.innerText = songs[songIndex - 1].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('forward').addEventListener('click', () => {
    if (songIndex > 9) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    songNameDisplay.innerText = songs[songIndex - 1].songsName;
    audioElement.play()
    audioElement.currentTime = 0;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})















































