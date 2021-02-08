const searchBtn = document.querySelector('#search__btn');
const songName = document.querySelector('#song__Name');

const fetchSongs = async (songName) => {
	const songs = await fetch(`https://api.lyrics.ovh/suggest/${songName}`);
	const displaySong = await songs.json();
	allSongRender(displaySong.data);
};

const allSongRender = (songs) => {
	const songContainer = document.querySelector('.single__song');
	const song = songs
		.map((song) => {
			return `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        `;
		})
		.join('');
	songContainer.innerHTML = song;
};

searchBtn.addEventListener('click', () => fetchSongs(songName.value));
songName.addEventListener('keyup', (e) =>
	e.keyCode == 13 ? fetchSongs(e.target.value) : 'sorry'
);
