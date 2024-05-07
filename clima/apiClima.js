const resultado = document.querySelector('.resultado');
const form = document.querySelector('.clima-contenedor');
const nombreCiudad = document.querySelector('#ciudad');
const nombrePais = document.querySelector('#pais');

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    if (nombreCiudad.value === "" || nombrePais.value ==="" ) {
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    callApi(nombreCiudad.value, nombrePais.value);
})

function callApi(ciudad, pais) {
    const apiId = '65c2de20cba90f7c868079d0ac839149';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

    fetch(url)
        .then(response => response.json())
        .then(dataJSON => {
            if (dataJSON.cod === "404") { 

                mostrarError("Ciudad no encontrada");

            } else {
                Limpiar();
                mostrarEltiempo(dataJSON);
            };
        })
        .catch(error => {
            console.error('Error al obtener datos meteorológicos:', error);
          });
}

function mostrarEltiempo(data) {
    const { name, main: { temp, temp_max, temp_min }, weather: [arr] } = data;

    const degrees = kelvinACentígrados(temp);
    const max = kelvinACentígrados(temp_max);
    const min = kelvinACentígrados(temp_min);

    const contenedor = document.createElement('div');
    contenedor.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}.png" alt="">
        <h2>${degrees}°C</h2>
        <p>Max:${max}°C</p>
        <p>Min:${min}°C</p>
    `;

    resultado.appendChild(contenedor);
}

function kelvinACentígrados(temp) {
    return parseInt(temp - 273.15);
}

function mostrarError(mensaje) {
    console.log(mensaje);
    const alerta = document.createElement('p');
    alerta.classList.add('alert-mensaje');
    alerta.innerHTML = mensaje;
    
    form.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function Limpiar() {
    resultado.innerHTML = "";
}
