const formulario=document.querySelector('#formulario');
const listaTweets= document.querySelector('#lista-tweets');
let tweets=[];


eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);


    document.addEventListener('DOMContentLoaded', ()=> {
        tweets=JSON.parse(localStorage.getItem('tweets'))||[] ;
        console.log(tweets);

        crearHTML();
    });
}

function agregarTweet(e){
    e.preventDefault();

   const tweet=document.querySelector('#tweet').value;
   if(tweet==='')
   {
    mostrarError('Un mensaje no puede ir vacio');
    return;
   }

    
   
   const tweetObj={
    id: Date.now(),
    texto:tweet
   }

   tweets=[...tweets,tweetObj];  

   console.log(tweets);
   

   crearHTML();

   formulario.reset();
}

function mostrarError(error){
    const mensaje=document.createElement('p');
    mensaje.textContent=error;
    mensaje.classList.add('error');

    const contenido=document.querySelector('#contenido');
    contenido.appendChild(mensaje);

    setTimeout(()=>{
        mensaje.remove();
    },3000)
}

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet=> {
            const btnEliminar=document.createElement('a')
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X';

            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id);
            }

            const li=document.createElement('li');
            li.innerText=tweet.texto;

            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
    

        })
    }

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

}


function limpiarHTML()  {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }

}

function borrarTweet(id){
   
    tweets=tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

