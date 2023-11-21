//import Monstruo from "./scripts/monstruo";
import {
  getMonstruosFetch,

} from "./scripts/bd.js";

//const pjs = localStorage.getItem("pjs") ? JSON.parse(localStorage.getItem("pjs")) : [];
const pjs =  await getMonstruosFetch();

console.log("Imprimiendo objetos:")
console.log(pjs);

setTimeout(() => 
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("contenedorTarjetas");
    contenedorTarjetas.removeAttribute("Hidden");
},2000);


const contenedorTarjetas = document.getElementById('contenedorTarjetas');

pjs.forEach(objeto => {
    const tarjetas = document.createElement('div');
    tarjetas.classList.add('tarjetas'); 

  const imagenNombreElemento = document.createElement('img');
  imagenNombreElemento.classList.add("imgTarjeta");
  imagenNombreElemento.src = "./media/icons/nombre2.png"; 
  imagenNombreElemento.alt = 'Imagen del nombre'; 

  tarjetas.appendChild(imagenNombreElemento);


  const nombreElemento = document.createElement('p');
  nombreElemento.classList.add("txtBox");
  nombreElemento.textContent = 'Nombre: ' + objeto.Nombre;
  tarjetas.appendChild(nombreElemento);
  
  
  
  const imagenAliasElemento = document.createElement('img');
  imagenAliasElemento.classList.add("imgTarjeta");
  imagenAliasElemento.src = "./media/icons/alias.png"; 
  imagenAliasElemento.alt = 'Imagen del alias'; 

  tarjetas.appendChild(imagenAliasElemento);
  
  const aliasElemento = document.createElement('p');
  aliasElemento.classList.add("txtBox");
  aliasElemento.textContent = 'Alias: ' + objeto.Alias;
  tarjetas.appendChild(aliasElemento);


  const imagenMiedoElemento = document.createElement('img');
  imagenMiedoElemento.classList.add("imgTarjeta");
  imagenMiedoElemento.src = "./media/icons/miedo.png"; 
  imagenMiedoElemento.alt = 'Imagen del miedo'; 

  tarjetas.appendChild(imagenMiedoElemento);
  
  const miedoElemento = document.createElement('p');
  miedoElemento.classList.add("txtBox");
  miedoElemento.textContent = 'Miedo: ' + objeto.Miedo;
  tarjetas.appendChild(miedoElemento);



  const imagenTipoElemento = document.createElement('img');
  imagenTipoElemento.classList.add("imgTarjeta");
  imagenTipoElemento.src = "./media/icons/tipo.png"; 
  imagenTipoElemento.alt = 'Imagen del tipo'; 

  tarjetas.appendChild(imagenTipoElemento);
  
  const tipoElemento = document.createElement('p');
  tipoElemento.classList.add("txtBox");
  tipoElemento.textContent = 'Tipo: ' + objeto.Tipo;
  tarjetas.appendChild(tipoElemento);

 const imagenDefensaElemento = document.createElement('img');
 imagenDefensaElemento.classList.add("imgTarjeta");
 imagenDefensaElemento.src = "./media/icons/defensa.png"; 
 imagenDefensaElemento.alt = 'Imagen de defensa'; 
 

 tarjetas.appendChild(imagenDefensaElemento);
 
 const defensaElemento = document.createElement('p');
 defensaElemento.classList.add("txtBox");
 defensaElemento.textContent = 'Defensa: ' + objeto.Defensa;
 tarjetas.appendChild(defensaElemento);
 
  contenedorTarjetas.appendChild(tarjetas);
});