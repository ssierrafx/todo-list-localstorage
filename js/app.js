// variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
const btnLimpiar = document.querySelector('#limpiar')
let tareas = [];

// Even listener
eventListeners();

function eventListeners(){

    formulario.addEventListener('submit', agregarTarea);

    btnLimpiar.addEventListener('click', limpiarTareas);

    document.addEventListener('DOMContentLoaded', () => {
        // recoge los valores del localStorage, los transforma a array y los almacena en tareas nuevamente
        tareas = JSON.parse(localStorage.getItem('tareas')) || []
        // activa la función que recorre el array tareas para mostrarlo en el html
        crearHTML();
    })
}

// Funciones
function agregarTarea(e){

    e.preventDefault();

    // Textarea donde el usuario escribe
    const textArea = document.querySelector('#tweet').value
    
    if (textArea === ''){
        mostrarError('Un mensaje no puede ir vacío')
        return;
    } 

    const tweetObj = {
        id: Date.now(),
        textArea
    }
    
    tareas = [...tareas, tweetObj]

 /*    console.log(tareas); */

    crearHTML();

    formulario.reset();
}

function limpiarTareas(e){
    e.preventDefault();
   
    if (confirm('¿Estás seguro de que deseas eliminar todas las tareas?') && tareas.length > 0){
        tareas = [];
        crearHTML();
    }
}

function mostrarError(error){
    const mensajeError = document.createElement('P')

    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    const contenido = document.querySelector('#contenido')

    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 2000)
}

function crearHTML(){

    limpiarHtml();

    if (tareas.length > 0){
        tareas.forEach(tweet => {

            const btnRemove = document.createElement('A')
            btnRemove.classList.add('borrar-tweet')
            btnRemove.innerText = 'X'

            btnRemove.onclick = () => {
                eliminarTarea(tweet.id);
            }

            const li = document.createElement('LI')
            li.classList.add('overflow-list')
            li.textContent = tweet.textArea

            li.appendChild(btnRemove)

            lista.appendChild(li)
        })
    }

    almacenarLocal();
}

function eliminarTarea(id){
    tareas = tareas.filter(tarea => tarea.id !== id);

    crearHTML();
}

function almacenarLocal(){
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function limpiarHtml(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}