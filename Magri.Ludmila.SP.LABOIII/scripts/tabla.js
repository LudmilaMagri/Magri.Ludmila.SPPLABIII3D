function crearTabla(data)
{ 
    if (data.length > 0)
    {
        const tabla = document.createElement("table");

        tabla.appendChild(crearCabecera(data[0]));
        tabla.appendChild(crearCuerpo(data));
        return tabla;
    }
    else
    {
        return document.createElement("table");
    }
}

const crearCabecera = (elemento) =>{
    const tHead = document.createElement("thead");
    const headRow = document.createElement("tr");

    for (const key in elemento){
        if(key === "id") continue; 
        const th = document.createElement("th");
        const textNode = document.createTextNode(key); 
       th.appendChild(textNode); 

       headRow.appendChild(th);

    }
    tHead.appendChild(headRow);
    return tHead;
}

const crearCuerpo = (data)=>{

    const tBody = document.createElement("tbody");

    data.forEach((element,index) => {
        const tr = document.createElement("tr");
        if(index % 2 == 0 ){
            tr.classList.add("rowPar");
        }
        for(const key in element){

        if(key === "id"){
            tr.dataset.id = element[key];
        }
        else{

            const td = document.createElement("td");
            td.textContent = element[key];
            tr.appendChild(td);
        }
        }
        tBody.appendChild(tr);
    });

    return tBody;


};

export default crearTabla;