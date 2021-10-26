const calmedBtn = document.querySelector('#calmed');
const nervousBtn = document.querySelector('#nervous');
const anxiousBtn = document.querySelector('#anxious');
const sleepyBtn = document.querySelector('#sleepy');
const gloomyBtn = document.querySelector('#gloomy');
const lonelyBtn = document.querySelector('#lonely');
const playBtn = document.querySelector('.play-btn');
const filter = document.querySelector('#filter');
const song = document.querySelector('.song');
const volume = document.querySelector('.volume-control');
var audio;
var mood;
var random;

loadEventListeners();

function loadEventListeners() {
    calmedBtn.addEventListener('click', loadPlayer);
    nervousBtn.addEventListener('click', loadPlayer);
    anxiousBtn.addEventListener('click', loadPlayer);
    sleepyBtn.addEventListener('click', loadPlayer);
    gloomyBtn.addEventListener('click', loadPlayer);
    lonelyBtn.addEventListener('click', loadPlayer); 
    playBtn.addEventListener('click', changePlayIcon);
    filter.addEventListener('keyup', filterSongs);
    volume.addEventListener('input', controlVolume);
}

function loadPlayer(e) {
    filter.value = '';
    mood = e.target.id;
    const songList = document.querySelector('.song-list');
    
    document.querySelector('.moods').style.opacity = 0;
    document.querySelector('.moods').style.display = 'none';
    document.querySelector('.player').style.opacity = 1;
    document.querySelector('.player').style.display = 'block';
    
    

    var moodSongs = songs.filter(song => song.mood === mood);
    moodSongs.forEach(song => {
        let songInfo = document.createElement('div');

        // Create Title P
        var pTitle = document.createElement('p');
        pTitle.innerHTML = song.title;

        // Create Artist P
        var pArtist = document.createElement('p');
        pArtist.innerHTML = song.artist;

        // Create Duration P
        var pDuration = document.createElement('p');
        pDuration.innerHTML = song.duration;

        songInfo.appendChild(pTitle);
        songInfo.appendChild(pArtist);
        songInfo.appendChild(pDuration);
        songInfo.className = 'song-info';
        songInfo.id = song.title;
        songInfo.addEventListener('click', changeSong)
        songList.appendChild(songInfo);
    });

    document.querySelector('.song-title').innerHTML = moodSongs[0].title;
    audio = new Audio('/songs/' + mood + '/'+ moodSongs[0].title + '.mp3');
    loadImage();
}

function loadImage() {

    var randomNumber = random;
    while (randomNumber === random) {
        randomNumber = Math.floor(Math.random() * ( 4 - 1) + 1);
    }
    random = randomNumber; 
    
    var songImg = document.querySelector('.song-img');
    songImg.src='/img/' + mood + '/' + random + '.jpg';
}

function changeSong(e) {7
    var playBtn = document.querySelector('.play-btn');

    if (song.classList.contains('playing')) {
        audio.pause();
        song.classList.remove('playing')
        playBtn.src = '/img/play.png';
    }

    var btn = document.querySelector('.song-title');
    btn.innerHTML = e.currentTarget.id;
    audio = new Audio('/songs/' + mood + '/' + e.currentTarget.id + '.mp3'); 
    
    loadImage();
}

function changePlayIcon(){
    var playBtn = document.querySelector('.play-btn');
    audio.volume = (document.querySelector('.volume-control').value / 100); 

    if (song.classList.contains('playing')) {
        audio.pause();
        song.classList.remove('playing')
        playBtn.src = '/img/play.png';
    }

    else {
        audio.play();
        song.classList.add('playing');
        playBtn.src = '/img/pause.png';
    }
}

function filterSongs(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.song-info:not(:first-child').forEach(function(songInfo) {
        var item = songInfo.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            songInfo.style.display = 'grid';
        }
        else songInfo.style.display = 'none';
    });
}

function controlVolume(e) {
    audio.volume = (e.target.value / 100);
}