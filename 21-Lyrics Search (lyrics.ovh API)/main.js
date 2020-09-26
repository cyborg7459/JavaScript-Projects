let searchField = document.getElementById('searchfield');
let searchBtn = document.getElementById('search');
let list = document.getElementById('list');
let pagination = document.getElementById('pagination');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let currentPage = document.getElementById('current-page');
let totalPages = document.getElementById('total-pages');
let lyrics = document.getElementById('lyrics');

let searchUrl = 'https://api.lyrics.ovh/suggest';
let lyricsUrl = 'https://api.lyrics.ovh/v1/';
let totalSongs = 0;
let current_page = 0;
let total_pages = 0;
let search = '';

searchBtn.addEventListener('click', ()=> {
    let searchString = searchField.value;
    lyrics.innerHTML = "";
    current_page = 1;
    totalSongs = 0;
    pagination.classList.add('d-none');
    if(searchString=="")
        alert("Please enter something to search");
    else
    {
        search = searchString;
        const url = `${searchUrl}/${searchString}`;
        getResult(url);
    }
})

async function getResult(url) {
    const res = await fetch(url);
    const data = await res.json();
    totalSongs = data.total;
    total_pages = Math.ceil(totalSongs/15);
    displayResult(data);
}

async function getLyrics(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.lyrics)
    {
        const lyricsText = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        displayLyrics(lyricsText);
    }
    else 
        displayLyricsError();
}

function displayResult(data) {
    let output = `
        <h1 class="text-center">Showing results for "${search}"</h1>
        <hr class="main-hr">
    `;
    let songList = data.data;
    if(songList.length==0)
    {
        output+=`
            <h1 class="text-center text-danger">Sorry, no results were found</h1>
        `
    }
    else {
        songList.forEach(song => {
            output+= `
                <div class="row">
                    <div class="col-4">
                        <span id="name">${song.title}</span> - 
                        <span id="artist">${song.artist.name}</span>
                    </div>
                    <div class="text-center col-6">
                        ${song.album.title}
                    </div>
                    <div class="text-center col-2">
                        <button class="lyrics-btn btn btn-outline-info">Get Lyrics</button>
                    </div>
                </div>
                <hr>
            `
        });
        addPagination();
    }
    list.innerHTML = output;
    initialiseLyricsBtn();
}

function displayLyrics(lyricsText)
{
    pagination.classList.add('d-none');
    list.innerHTML = "";
    lyrics.innerHTML = lyricsText;
}

function displayLyricsError() {
    pagination.classList.add('d-none');
    list.innerHTML = "";
    lyrics.innerHTML = `
        <h1 class="text-center text-danger">Sorry, the lyrics for this song are currently unavailabe</h1>
    `
}

function addPagination() {
    pagination.classList.remove('d-none');
    currentPage.innerHTML = current_page;
    totalPages.innerHTML = total_pages;
    if(current_page==1)
        prevBtn.classList.add('disabled');
    else
        prevBtn.classList.remove('disabled');
    if(current_page==total_pages)
        nextBtn.classList.add('disabled');
    else
        nextBtn.classList.remove('disabled');
}

nextBtn.addEventListener('click', () => {
    if(current_page!=total_pages)
    {
        let url = `${searchUrl}/${search}&index=${current_page*15}`;
        current_page++;
        console.log(url);
        getResult(url);
    }
})

prevBtn.addEventListener('click', () => {
    if(current_page!=1)
    {
        current_page--;
        let url = `${searchUrl}/${search}&index=${(current_page-1)*15}`;
        console.log(url);
        getResult(url);
    }
})

function initialiseLyricsBtn() {
    document.querySelectorAll('.lyrics-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let songName = btn.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerHTML;
            let artistName = btn.parentElement.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.innerHTML;
            let url = `${lyricsUrl}/${artistName}/${songName}`;
            console.log(url);
            getLyrics(url);
        })
    })
}

