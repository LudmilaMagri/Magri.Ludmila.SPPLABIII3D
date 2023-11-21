import Monstruo from "./scripts/monstruo.js"
import {personajes} from "./data/personajes.js";
import crearTabla from "./scripts/tabla.js";
import {
    getTiposMonstruosFetch,
    deleteMonstruoAxios,
    getMonstruosAjax,
    createMonstruoAjax,
    updateMonstruoAjax
} from "./scripts/bd.js";



//Carga del STORAGE
// pjs = localStorage.getItem("pjs") ? JSON.parse(localStorage.getItem("pjs")) : [];

//traigo monstruos
const pjs =  await getMonstruosAjax();


console.log("Imprimiendo objetos:")
console.log(pjs);

const contenedorTabla = document.getElementById("table");
const form = document.forms[0];
let banderaFiltros = false;
const checkbox = document.querySelectorAll(".chbox");
checkbox.forEach(element => {element.checked = true;});
console.log(contenedorTabla);


actualizarTabla(contenedorTabla,pjs);

// *****************************************CREATE MONSTRUO************************************************************

const frmPjs = document.forms[0];
frmPjs.addEventListener("submit", (e) =>
{
    const frmAlta = e.target;
    console.log(e);

    e.preventDefault(); 

    console.log("Imprimo valores leidos:");

    console.log(frmAlta.Nombre.value);
    console.log(frmAlta.Alias.value);
    console.log(frmAlta.Defensa.value);
    console.log(frmAlta.Miedo.value);
    console.log(frmAlta.Tipo.value);

    let id = Date.now();
    let Nombre = frmAlta.Nombre.value;
    let Alias = frmAlta.Alias.value;
    let Defensa = frmAlta.Defensa.value;
    let Miedo = frmAlta.Miedo.value;
    let Tipo = frmAlta.Tipo.value;
    if(validarCampos(id, Nombre, Alias, Defensa, Miedo, Tipo) == false){
        alert ("Error en validar campos del formulario.");
    }
    else{
        const newPersonaje = new Monstruo(id, Nombre, Tipo, Alias, Defensa, Miedo);

        //LS
        //pjs.push(newPersonaje);
        //localStorage.setItem("pjs", JSON.stringify(pjs));

        createMonstruoAjax(newPersonaje);
    }
    frmPjs.reset();

});

// ***************************************************************************************************
// **************************************DELETE*******************************************************

const botonEliminar = document.getElementById("BtnEliminar");
botonEliminar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        pjs.forEach((element) =>
        {
            if (element.id == idFilaClickeada)
            {
               deleteMonstruoAxios(element.id);

                if(flagFilaSeleccionada == true)
                {
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                frmPjs.reset();

                actualizarTabla(contenedorTabla, pjs);

                return;
            }
        });
    }
    else
    {
        alert("Seleccione un monstruo para eliminar");
    }
});



// ***************************************************************************************************
// **************************************MODIFICAR****************************************************

const botonModificar = document.getElementById("BtnModificar");
botonModificar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        //Recorro todos los elementos
        pjs.forEach((element, index) =>
        {
            if (element.id == idFilaClickeada)
            {
            
                let newNombre = document.getElementById("txtBoxNombre").value;
                let newAlias = document.getElementById("txtBoxAlias").value;
                let newMiedo = document.getElementById("rangeMiedo").value;
                let newTipo = document.getElementById("selectTipo").value;

                let newDefensa;

                if (document.getElementById("radioBtnTipoEstaca").checked == true)
                {
                    newDefensa = "Estaca";
                }
                else if (document.getElementById("radioBtnTipoPlata").checked == true)
                {
                    newDefensa = "Plata";
                }
                else if (document.getElementById("radioBtnTipoCrucifijo").checked == true)
                {
                    newDefensa = "Crucifijo";
                }
                else if (document.getElementById("radioBtnTipoPosion").checked == true)
                {
                    newDefensa = "Posion";
                }

                let newMonstruo = new Monstruo(element.id, newNombre, newTipo, newAlias, newDefensa, newMiedo);

                console.log("MONSTRUO A UPDATEAR: ", newMonstruo);

                updateMonstruoAjax(newMonstruo);

                if(flagFilaSeleccionada == true)
                {
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }

                frmPjs.reset();
                return;
            }
        });
    }
    else
    {
        alert("No se puede modificar si no hay nada seleccionado en la tabla.");
    }
});

//*************************************************************************************************
//*************************************CANCELAR****************************************************

const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click",(e) =>
{
    if(flagFilaSeleccionada == true)
    {
        idFilaClickeada = null;
        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
    }

    frmPjs.reset();
});
// ***************************************************************************************************

function validarCampos(idRecibido,nombre,alias)
{
    if (idRecibido == null || idRecibido == undefined ||
        nombre == null     || nombre == undefined     ||  nombre == ""  ||
        alias == null      || alias == undefined      ||  alias == ""   )
    {
        return false;
    }
    return true;
}


function actualizarTabla(contenedor, data)
{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
    ordenarTabla(data)
    promedio.value = calcularPromedio(data);
    contenedor.appendChild(crearTabla(data));
    
};



// ********************************************************************

let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

contenedorTabla.addEventListener("click", (e) =>
{
    const ubicacionClickeada = e.target;
    console.log(e.target);

    idFilaClickeada = e.target.parentElement.dataset.id;
    if (ubicacionClickeada.matches("tr td") == true)
    {
        console.log("El ID del monstruo seleccionado: "+idFilaClickeada);
        const fila = ubicacionClickeada.parentElement;

        if (fila.matches("tr") == true && flagFilaSeleccionada == false && fila != null && fila != undefined)
        {
            mostrarFila(idFilaClickeada);

            fila.style.backgroundColor = 'antiquewhite';
            flagFilaSeleccionada = true;
            ultimaFilaSeleccionada = fila;
        }
        else if (fila.matches("tr") == true && flagFilaSeleccionada == true && fila != null && fila != undefined)
        {
            mostrarFila(idFilaClickeada);
            ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";

            fila.style.backgroundColor = 'antiquewhite';
            ultimaFilaSeleccionada = fila;
            flagFilaSeleccionada = true;
        }
    }
});

function mostrarFila(idRecibido)
{
    pjs.forEach((element) =>
    {
    if (element.id == idRecibido)
    {
        document.getElementById("txtBoxNombre").value = element.Nombre;
        document.getElementById("txtBoxAlias").value = element.Alias;
        document.getElementById("rangeMiedo").value = element.Miedo;
        document.getElementById("selectTipo").value = element.Tipo;
    }
    });
}

//Loader
setTimeout(() =>
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table");
    divPrincipal.removeAttribute("Hidden");
    const divBotones = document.getElementById("botones-tabla");
    divBotones.removeAttribute("Hidden");
    const divFiltro = document.getElementById("divFiltro");
    divFiltro.removeAttribute("Hidden");
},2000);





//************************************************************************************
//**************************************FILTROS***************************************
//************************************************************************************
const selector = document.getElementById("filtro");

let listaFiltrada = filtrarTabla(contenedorTabla, pjs, selector.value);
let listadoCheck = listaFiltrada;

// contenedorTabla.addEventListener("click", (e)=>
// {
//     if(e.target.matches("td")) // Solamente cuando haces click sobre TD y no en cualquier lado de la ventana.
//     {
//         let selectedItem;
//         index = e.target.parentElement.dataset.id;
//         console.log("INDEX:", index);
//         console.log("listaFiltrada ", listaFiltrada);
//         id = listaFiltrada[index].id;
//         selectedItem = listaFiltrada.find((item)=>item.id == id);
//         cargarFormItem(form, selectedItem);
//         document.getElementById("btnCancelar").disabled = false;
//         document.getElementById("btnEliminar").disabled = false;
//     }
//     else if(e.target.matches("th"))
//     {   //TODO (EL SORT NO ESTA TERMINADO TOTALMENTE, FUNCIONA PARCIALMENTE, FALTAN ALGUNOS DETALLES)
//         let claveSort = e.target.textContent;
//         ordenarTabla(listadoCheck, claveSort);
//         actualizarTabla(contenedorTabla, listadoCheck);
//     }
// });


function limpiarForm()
{
    id = null;
    index = null;
    form.reset();
}


//Cargo los "Tipo"
const listaTipoMonstruos = await getTiposMonstruosFetch();
cargarTipoMonstruos(listaTipoMonstruos);

function cargarTipoMonstruos(lista)
{
    let input = document.getElementById("filtro");
    for (let i = 0; i < lista.length; i++)
    {
        const tipo = document.createElement('option');
        input.appendChild(tipo);
        tipo.value = lista[i];
        tipo.textContent = lista[i];
    }
}



// Filtro tabla
function filtrarTabla(contenedor, lista, filtro)
{
     if(filtro != "Todos" && filtro != '')
    {
        let listaFiltrada = lista.filter((elemento)=>elemento.Tipo == filtro); // FILTRO
        actualizarTabla(contenedor, listaFiltrada);
        banderaFiltros = true;
        return listaFiltrada;
    }
    else
    {
        actualizarTabla(contenedor, lista);
        banderaFiltros = false;
        return lista;
    }
}

selector.addEventListener("change", () =>
{
    listaFiltrada = filtrarTabla(contenedorTabla, pjs, selector.value);
    checkbox.forEach(element => {element.checked = true;});
    limpiarForm();
});

// Checkbox
const modificarTabla = () =>
{
    const checked = {};
    checkbox.forEach((elem) => {checked[elem.name] = elem.checked});
    listadoCheck = listaFiltrada.map((elem) => 
    {
        const newElement = {};
        for (const key in elem)
        {
            if(key == "id" || checked[key] == true)
            {
                newElement[key] = elem[key];
            }
        }
        return newElement;
    });
    actualizarTabla(contenedorTabla, listadoCheck);
};

checkbox.forEach((elem) => elem.addEventListener("click", modificarTabla));


//Calculo promedio de miedo
function calcularPromedio(array)
{
    if (array != null)
    {
        let cantidadTotal = array.length;
        let acumulador = 0;
        array.forEach(element => 
        {
            acumulador =  parseInt(acumulador) +  parseInt(element.Miedo);
        });
    
        let valorCalculado = acumulador / cantidadTotal;

        if (isNaN(valorCalculado) == true)    
        {
            valorCalculado = "No hay monstruos!";
        }
        return valorCalculado;
    }
}

//Ordeno tabla decreciente por Miedo
function ordenarTabla(lista)
{
    lista.sort((a,b)=> b.Miedo - a.Miedo);
}

