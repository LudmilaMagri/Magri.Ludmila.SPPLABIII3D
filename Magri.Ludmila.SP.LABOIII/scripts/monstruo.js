import Personaje from "./personaje.js";

class Monstruo extends Personaje
{
    constructor(idRecibido, nombreRecibido, tipoRecibido, aliasRecibido, defensaRecibida, miedoRecibido)
    {
        super(idRecibido, nombreRecibido, tipoRecibido);
        this.Alias = aliasRecibido;
        this.Defensa = defensaRecibida;
        this.Miedo = miedoRecibido;
    }
}

export default Monstruo;