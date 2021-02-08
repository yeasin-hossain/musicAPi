const searchBtn = document.querySelector('#search__btn');
const songName = document.querySelector('#song__Name');

const fetchSongs = async (songName) => {
	try {
		const songs = await fetch(`https://api.lyrics.ovh/suggest/${songName}`);
		const displaySong = await songs.json();
		displaySong.data.length != 0
			? allSongRender(displaySong.data)
			: errorMessage('Sorry No Song Found, Please Try Again!!');
	} catch {
		console.log(error);
	}
};
const fetchLyrics = async (artist, title) => {
	try {
		const lyrics = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
		const displayLyrics = await lyrics.json();

		displayLyrics.lyrics.length != 0
			? renderLyrics(displayLyrics.lyrics)
			: errorMessage('Sorry No Lyrics Found');
	} catch {
		console.log(err);
	}
};
const allSongRender = (songs) => {
	errorMessage('');
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
                <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
            </div>
        </div>
        `;
		})
		.join('');
	songContainer.innerHTML = song;
};
const renderLyrics = (lyrics) => {
	errorMessage('');
	document.querySelector('.single-lyrics').innerText = ` ${lyrics}`;
};
const errorMessage = (msg) => {
	// console.log(msg);
	document.querySelector(
		'.single-lyrics'
	).innerHTML = `<p class="text-danger fw-bolder"> ${msg} </p>`;
};
const getLyrics = (artistName, title) => {
	fetchLyrics(artistName, title);
};
searchBtn.addEventListener('click', () => fetchSongs(songName.value));
songName.addEventListener('keyup', (e) =>
	e.keyCode == 13 ? fetchSongs(e.target.value) : 'sorry'
);
