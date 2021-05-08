let datosCompletos = [];

function LeerDatos() {
    fetch('http://localhost:9000/AnalisisSuelos')
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            datosCompletos = datosJSON;
            MostrarDatos(datosJSON);
        });
}

function MostrarDetalles(tiempo_establecimiento, riego, fertilizantes_aplicados) {
    let detalles = "Tiempo Establecimiento: " + tiempo_establecimiento + ", Riego: " + riego + ", Fertilizantes Aplicados: " + fertilizantes_aplicados;
    document.querySelector("#divDetalles").innerHTML = detalles;
    let elem = document.querySelector("#modalDetalles");
    let instance = M.Modal.getInstance(elem);
    instance.open();
}

function FiltroPorNombre(filtro) {
    let datosFiltrados = datosCompletos.filter(x => x.departamento.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroPorSexo(filtro) {
    let datosFiltrados = datosCompletos.filter(x => x.municipio.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroPorEspecialidad(filtro) {
    let datosFiltrados = datosCompletos.filter(x => x.cultivo.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroPorCovid(filtro) {
    let datosFiltrados = datosCompletos.filter(x => x.topografia.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function MostrarDatos(datosJSON) {
    let registrosHtml = "";
    datosJSON.forEach(registro => {

        registrosHtml += `<tr>
                        <td>
                            ${registro.departamento}
                        </td>
                        <td>
                            ${registro.municipio}
                        </td>
                        <td>
                            ${registro.cultivo}
                        </td>
                        <td>
                            ${registro.estado}
                        </td>
                        <td>
                            ${registro.topografia}
                        </td>
                        <td>
                            ${registro.drenaje}
                        </td>
                        <td>
                            <button class="waves-effect waves-light" type="button" onclick="MostrarDetalles(\'${registro.tiempo_establecimiento}\', \'${registro.riego}\', \'${registro.fertilizantes_aplicados}\')" >
                                <i class="material-icons center">search</i>
                            </button>
                        </td>
                    </tr>`;
    });
    document.querySelector('#contenidoDatosAnalisisSuelos').innerHTML = registrosHtml;
}

LeerDatos();