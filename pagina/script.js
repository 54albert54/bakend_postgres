const mostrarProducto = document.querySelector('.mostrar-producto')
const agregarProducto = document.querySelector('.agregarProducto')
const animation = document.querySelector('.animation')
const main = document.querySelector('.main')
const root = document.querySelector('.root')
const nombre = document.getElementById('name')
const imagen = document.getElementById('img')
const descripcion = document.getElementById('descripcion')
const price = document.getElementById('price')
const categoria = document.getElementById('categoria')



const url = 'https://server-api-ffb5.onrender.com/api/v1/products/'




const toChange= (link)=>{
  const url = link;
  window.location.href = url;
}
const showNotification =(messeger)=>{
  const notificacion = document.getElementById('notificacion')
  notificacion.innerText = messeger
}

let items


(async()=>{
  console.log("buscare datos")
const response = await fetch(url)
const data = await response.json()
const hasdata = await data
items=data

if(response){
  console.log("ya traje los datos datos")
}

})();




const changeV =()=>{
  main.classList.toggle("invicible")
  mostrarProducto.classList.toggle("invicible")


}

function changeP(){
  main.classList.toggle("invicible")
  agregarProducto.classList.toggle("invicible")
}

function showData(){
  changeV()
  let leftPosition = -240;
  const speed = 3; // La
  function moveDiv() {
    leftPosition += speed;
    animation.style.left = leftPosition + 'px';

    if (leftPosition >= window.innerWidth) {
      leftPosition = 0;
    }
  }

  const loading = setInterval(moveDiv, 50); // Llama a moveDiv cada 50 milisegundos


  setTimeout(()=>{
    animation.classList.add("invicible")
    clearInterval(loading)
   mostrarProducto.style.border = "1px rgba(255, 255, 255, 0.489) solid"
   mostrarProducto.style.background = "#a09794"
   mostrarProducto.style.background = "box-shadow: 1px 2px 3px rgba(111, 111, 110, 0.743);"
    items.map((producto,index) =>{
      const items = document.createElement('div')
      items.innerHTML = `<div class="container">
      <h2> ${producto.name}</h2>
      <h2>Presio: ${producto.price}$</h2>
      <img class="container_img" src="${producto.image}" alt="${producto.name}">
      <p class="container_des">${producto.description}</p>

      <p>Categoria: ${producto.category.name}</p>
      <p> ${index +1}</p>


    </div>`

    root.appendChild(items)
    })
  },10000)


}

const sendData =()=>{

const newProducto= {
  name:nombre.value,
  image:imagen.value,
  description:descripcion.value,
  price:parseInt(price.value),
  categoryId:categoria.value
}
const accessP ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI1LCJyb2xlIjoidmlzaXRhcyIsImlhdCI6MTY5MTI4Mjc3Nn0.65w77BN2nJ93yukJWG_S8owiMGCvc4nbDajih57cOXQ"
const accessL = ""
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${accessP}`
  },
  body: JSON.stringify(newProducto) // Convertimos el objeto data a formato JSON
};
console.log(options.body)

async function makeFeth (){const response = await fetch(url,options)
  const data = await response.json()
  console.log(data)
  console.log(newProducto)

  };

  makeFeth()


}

