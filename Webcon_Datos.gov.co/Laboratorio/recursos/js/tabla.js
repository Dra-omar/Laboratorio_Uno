let datosCompletos = [];

function LeerDatos() {
    //https://www.datos.gov.co/resource/i7cb-raxc.json

fetch("http://localhost:9000/datos-ciencia").then(respuesta => respuesta.json()).then(json => {
    json.forEach(element => {
        //alert(element.name)
    });
});

    fetch('https://www.datos.gov.co/resource/yhxn-eqqw.json')
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            datosCompletos = datosJSON;
            MostrarDatos(datosJSON);
        });
}

function MostrarDetalles(rangoedad, condicion, tipoevento, actividad) {
    let detalles= "Rango de Edad: " + rangoedad + ", Condicion: " + condicion + ", Tipo de Evento: " + tipoevento + ", Actividad: " + actividad;
    document.querySelector("#divDetalles").innerHTML = detalles;
    let elem = document.querySelector("#modalDetalles");
    let instance = M.Modal.getInstance(elem);
    instance.open();
}

function FiltroPorDepartamento(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.departamento.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroPorMunicipio(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.municipio.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroAño(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.ano.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function MostrarDatos(datosJSON){
    let registrosHtml = "";
    datosJSON.forEach(registro => {

        registrosHtml += `<tr>
                        <td>
                            ${registro.ano}
                        </td>
                        <td>
                            ${registro.departamento}
                        </td>
                        <td>
                            ${registro.municipio}
                        </td>
                        <td>
                            ${registro.genero}
                        </td>
                        <td>
                            ${registro.estado}
                        </td>
                        <td>
                            <button class="waves-effect waves-light" type="button" onclick="MostrarDetalles(\'${registro.rangoedad}\', \'${registro.condicion}\', \'${registro.tipoevento}\', \'${registro.actividad}\')" >
                                <i class="material-icons right">search</i>
                            </button>
                        </td>
                    </tr>`;
    });
    document.querySelector('#TabladeEventosMAP').innerHTML = registrosHtml;
}

LeerDatos();