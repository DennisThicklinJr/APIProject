//add the api key 

const auth = "563492ad6f9170000100000196d66451a04b40efa0b72fd96084c5ab";

// select elements 
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue; 
let fetchLink;
let page = 1;
// let currentSearch;


searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (e) => {
    // forms refresh the page by default 
    e.preventDefault();
    // this plugs the search into the search url and we get new images based on it 
    searchPhotos(searchValue);
})

//event listener for the more button
more.addEventListener('click', loadMore)

function updateInput(e){
    console.log(e.target.value);
    searchValue = e.target.value; 
}

// this function fetches the data for us 
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        // method is what we want to do with the data, we want to GET the data 
        method: 'GET',
        headers:{
            Accept: 'application/json',
            Authorization: auth
        }
    });
     // parses the data into object from which we can access it 
    const data = await dataFetch.json();
    console.log(data);
    // return the data for later use 
    return data;
}

// this function generates the html (loads the images and photographer names) when the data is received. 
function generatePictures(data){
    data.photos.forEach(photo => {
        // create a new div for each photo programmatically
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class='gallery-info'>
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    })
}

//create an async function to fetch the photos from Pexels
async function curatedPhotos(){

    // load up random curated images from Pexels 
    const data = await fetchApi('https://api.pexels.com/v1/curated?per_page=16&page=1');
    generatePictures(data);
}

async function searchPhotos(searchQuery){
    clear();
    // this data is based on the search query 
    fetchLink = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=16&page=1`;
    const data = await fetchApi(fetchLink);
    // load up pictures based on search query 
    generatePictures(data);
}

// this function will clear the current images to make way for the new images based on our search query 
function clear(){
    // removes the image html 
    gallery.innerHTML = "";
    // clears the text from the search bar 
    searchInput.value = '';
}

async function loadMore() {
    page++;
    if(searchValue){
        // load up more images based on our search 
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=16&page=${page}`
    }else{
        // load up more curated images provided by Pexels
        fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}` 
    }
    //generate the pictures
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();