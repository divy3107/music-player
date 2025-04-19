const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "songs/song1.mp3",
        lyrics: "These are the lyrics for song 1...",
        img: "img/album1.jpg",
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "songs/song2.mp3",
        lyrics: "These are the lyrics for song 2...",
        img: "img/album2.jpg",
    }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

document.getElementById('playPause').addEventListener('click', togglePlayPause);
document.getElementById('prev').addEventListener('click', prevSong);
document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('progress-bar').addEventListener('input', updateProgress);
document.getElementById('volume-bar').addEventListener('input', updateVolume);

function loadSong(songIndex) {
    audio.src = songs[songIndex].src;
    audio.load();
    document.getElementById('song-title').innerText = songs[songIndex].title;
    document.getElementById('artist-name').innerText = songs[songIndex].artist;
    document.getElementById('album-img').src = songs[songIndex].img;
    document.getElementById('lyrics-text').innerText = songs[songIndex].lyrics;
    updateDuration();
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('playPause').innerText = 'Pause';
    } else {
        audio.pause();
        document.getElementById('playPause').innerText = 'Play';
    }
}

function prevSong() {
    currentSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    loadSong(currentSongIndex);
    audio.play();
    document.getElementById('playPause').innerText = 'Pause';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    document.getElementById('playPause').innerText = 'Pause';
}

function updateProgress() {
    let progress = document.getElementById('progress-bar');
    let time = (audio.duration * progress.value) / 100;
    audio.currentTime = time;
}

function updateVolume() {
    audio.volume = document.getElementById('volume-bar').value / 100;
}

function updateDuration() {
    document.getElementById('duration').innerText = formatTime(audio.duration);
    audio.ontimeupdate = function () {
        let progress = document.getElementById('progress-bar');
        progress.value = (audio.currentTime / audio.duration) * 100;
        document.getElementById('time').innerText = formatTime(audio.currentTime);
    };
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize playlist
songs.forEach((song, index) => {
    let li = document.createElement('li');
    li.innerText = `${song.title} - ${song.artist}`;
    li.addEventListener('click', function () {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        document.getElementById('playPause').innerText = 'Pause';
    });
    document.getElementById('playlist').appendChild(li);
});

// Load the first song
loadSong(currentSongIndex);
