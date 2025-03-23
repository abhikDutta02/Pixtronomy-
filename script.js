import CONFIG from "./config.js";

const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key="
const key = CONFIG.NASA_API_KEY;

let ipDate = document.getElementById('isDate');
let butu = document.getElementById('myButton');
let explain = document.getElementById('explain');
let title = document.getElementById('title')
let loading = document.getElementById('loading');
let image = document.getElementById('photo');
let readMore=document.getElementById('read-more')

butu.addEventListener('click', async (evt) => {
    console.log(explain.textContent)
    let date = ipDate.value;
    let URL = `${BASE_URL}${key}&date=${date}`;

    if (!date) {
        alert('Please enter date');
    }
    
    loading.style.display = 'block';
    image.style.display = 'none';
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        console.log(data.explanation);

        if (data.hdurl) {

            const fullText = data.explanation;
            const halfText = fullText.length > 100 ? fullText.substring(0, 100) + '...' : fullText;

            explain.textContent = halfText;
            explain.setAttribute('data-full', fullText);

            readMore.style.display = fullText.length > 100 ? 'inline' : 'none';

            image.src = data.hdurl;
            title.textContent = data.title;
            image.alt = data.title;
            image.style.display = 'block'
        } else {
            title.textContent = 'No Image Availble';
            image.style.display = 'none';
            explain.innerHTML = '';
        }
    } catch (error) {
        console.log('Error fetching data', error);
        title.textContent = 'Error fetching data';
    } finally {
        loading.style.display = 'none';
    }
    
})
// console.log(ipDate);