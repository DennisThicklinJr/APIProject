//add the api key 

const auth = "563492ad6f9170000100000196d66451a04b40efa0b72fd96084c5ab";

// select elements 
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue; 

searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (e) => {
    // forms refresh the page by default 
    e.preventDefault();
    // this plugs the search into the search url and we get new images based on it 
    searchPhotos(searchValue);
})

function updateInput(e){
    // console.log(e.target.value);
    searchValue = e.target.value; 
}

//create an async function to fetch the photos from Pexels
async function curatedPhotos(){
    const dataFetch = await fetch('https://api.pexels.com/v1/curated?per_page=15&page=1', {
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
    // we have to do something forEach photo added
    data.photos.forEach(photo => {
        // create a new div for each photo programmatically
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    })
}