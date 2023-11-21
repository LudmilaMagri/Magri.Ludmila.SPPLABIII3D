const miURL = "http://localhost:3000/monstruos";
const tipoMonstruosURL = "http://localhost:3000/tipoMonstruos";


// ********************* FETCH ****************************

export const getMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
      
    });
};


export const getTiposMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(tipoMonstruosURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
        
    });
};

export const createMonstruoFetch = (monstruo) => 
{
    fetch(miURL, {    
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(monstruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    
};

export const deleteMonstruoFetch = (id) => 
{
    fetch(miURL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok) return Promise.reject(respuesta);
        console.log("Borrado con exito");
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
   
};

export const updateMonstruoFetch = (monstruo) => 
{
    console.log(monstruo.id);
    fetch(miURL + "/" + monstruo.id, {   
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(monstruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
   
};


// ********************* AXIOS ****************************
//<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>

export const getMonstruosAxios = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) =>{
        axios.get(miURL)            // El Axios trabaja con Ajax, retorna una Promesa
        .then((res)=> // ({data})
        {
            const {data} = res;
            resolve(data);
        })
        .catch((err)=>
        {
            reject(err.message);
        })
        
    });
};

export const createMonstruoAxios = async (monstruo) => 
{
    try 
    {
        let {datos} = await axios.post(miURL, monstruo, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
  
};

export const deleteMonstruoAxios = async (id) => 
{
    try
    {
        let {data} = await axios.delete(miURL + "/" + id);
        console.log(data);
    }
    catch(err)
    {
        console.error(err.message);
    }
   
};

export const updateMonstruoAxios = async (monstruo) => 
{
    try 
    {
        let {datos} = await axios.put(miURL + "/" + monstruo.id, monstruo, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
   
};



// ********************* AJAX ****************************
export const getMonstruosAjax = () => 
{
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
        }
    });
    xhr.open("GET", miURL);
    xhr.send();
    });
};

export const getMonstruoPorIdAjax = (id) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("GET", miURL + "/" + id);
    xhr.send();
};

export const createMonstruoAjax = (monstruo) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("POST", miURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};

export const deleteMonstruoAjax = (id) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log("Borrado");
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("DELETE", miURL + "/" + id);
    xhr.send();
};

export const updateMonstruoAjax = (monstruo) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("PUT", miURL + "/" + monstruo.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};