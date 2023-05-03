function onJson(json){

}
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
function serachTwo(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const anime_input = document.querySelector('#kitsu');
  const anime_value = encodeURIComponent(anime_input.value);
  console.log('Eseguo ricerca: ' + anime_value);
  // Esegui la richiesta
  fetch("https://=" + anime_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}
function onTokenJson(json)
{
  // Imposta il token global
    token = json.access_token;
}

function onTokenResponse(response)
{
    console.log(response);
    return response.json();
}
// OAuth credentials --- NON SICURO!
const client_id = 'dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd';
const client_secret = '54d7307928f63414defd96399fc31ba847961ceaecef3a5fd93144e960c0e151';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://kitsu.io/api/oauth/token",
	{
   method: "POST",
   body: {
    grant_type: 'password',
    username: '<email|slug>',
    password: '<password>' // RFC3986 URl encoded string
  }, 
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const form2 = document.querySelector('#second-form');
form2.addEventListener('submit', serachTwo);



// ************************************************************************
function onYTJson(json){
    console.log(json);
    const result = document.querySelector('#first');
    result.innerHTML= '';   //cancelliamo il contenuto precedente
    for(let i=0; i<limit; i++){
        const link = 'https://www.youtube.com/watch?v='+json.items[i].id.videoId;
        const title = json.items[i].snippet.title;
        const elem = document.createElement('a'); //creo elemento link
        elem.href = link;
        elem.text = title;
        elem.classList.add('link');
        result.appendChild(elem);    
    }
}

function onYTResponse(response) {
    return response.json();
}

function searchOne(event)
{
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const video_input = document.querySelector('#youtube');
    const video_value = encodeURIComponent(video_input.value);
    // Prepara la richiesta
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${video_value}&key=${api_key}`;
    fetch(url).then(onYTResponse).then(onYTJson);
}
const limit = 6;
const api_key = 'AIzaSyARL7lYWaUWUbw0BXfho0X2Bk_9oFCUwvI';

const form1 = document.querySelector('#first-form');
form1.addEventListener('submit', searchOne);
