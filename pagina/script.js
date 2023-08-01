const toChange= (link)=>{
  const url = link;
  window.location.href = url;
}
const showNotification =(messeger)=>{
  const notificacion = document.getElementById('notificacion')
  notificacion.innerText = messeger
}

const root = document.getElementById('root')

fetch('https://server-api-ffb5.onrender.com/api/v1/products/')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
