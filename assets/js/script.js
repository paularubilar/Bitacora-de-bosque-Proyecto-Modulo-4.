/*Bitacora de Registro, monitoreo de biodiversidad*/
// LECCIÓN #4: Funciones para cada operación matemática
const sumar = (a, b, c) => a + b + c;
const dividir = (total, cantidad) => total / cantidad;

// Función que llama a otras funciones para optimizar
function calcularPromedioFinal(n1, n2, n3) {
    const sumaTotal = sumar(n1, n2, n3);
    return dividir(sumaTotal, 3);
}

//Plantilla para todad las especies
class Especie {
    constructor(nombre, suelo, brotes, diversidad) {
        this.nombre = nombre;
        this.suelo = suelo;
        this.brotes = brotes;
        this.diversidad = diversidad;
        this.fecha = new Date().toLocaleDateString();
    }
    // Método dentro del objeto
    obtenerResumen() {
        return `Especie: ${this.nombre} registrada el ${this.fecha}`;
    }
} 

//Almacenamiento
const historialObservaciones = [];

//  Función para interacción inicial (prompt y alert)
function saludarUsuario() {
    console.log("Iniciando sistema de monitoreo..."); // Mensaje en consola
    const nombre = prompt("¿Cuál es tu nombre de observador?");
    if (nombre) {
        alert("Bienvenido al sistema, " + nombre + ". Los datos se guardarán en el historial.");
    }
}
// Lógica principal
function hacerCalculo() {
    //capturar los elementos del Dom
    const nombreInput = document.getElementById("nombreEspecie");
    const pSueloInput = document.getElementById("puntajeSuelo");
    const pBrotesInput = document.getElementById("puntajeBrotes");
    const pDiversidadInput = document.getElementById("puntajeDiversidad");

    //Obtener valores y se convierte a numeros 
    const nombre = nombreInput.value;
    const pSuelo = parseInt(pSueloInput.value);
    const pBrotes = parseInt(pBrotesInput.value);
    const pDiversidad = parseInt(pDiversidadInput.value);

    //validación 
    if (!nombre || isNaN(pSuelo) || isNaN(pBrotes) || isNaN(pDiversidad)) {
        alert("Por favor, completa todos los campos con puntaje del 1 al 10.");
        return;
    }
    if (pSuelo < 1 || pSuelo > 10 || pBrotes < 1 || pBrotes > 10 || pDiversidad < 1 || pDiversidad > 10) {
        alert("Los puntajes deben ser valores entre 1 y 10.");
        return; // Detiene la ejecución si el rango es incorrecto
    }

    //creacion del objeto
    const nuevaEspecie = new Especie(nombre, pSuelo, pBrotes, pDiversidad);
    
    // Guardar arreglo
    historialObservaciones.push(nuevaEspecie);

    //Actualizacion y limpieza de la página
    actualizarDashboard(nuevaEspecie);
    renderizarHistorial(historialObservaciones);
    limpiarFormulario(nombreInput, pSueloInput, pBrotesInput, pDiversidadInput);

    // Ejecución en consola
    console.log("--- Nuevo Registro Detectado ---");
    console.table(nuevaEspecie);
    console.log("Historial actualizado:", historialObservaciones);
}

function actualizarDashboard(especie) {
    const promedio = calcularPromedioFinal(especie.suelo,especie.brotes, especie.diversidad);
    const porcentaje = (promedio * 10); //  Vitalidad

    document.getElementById("conteo-total").innerText = historialObservaciones.length;
    document.getElementById("indice-vitalidad").innerText = `${porcentaje.toFixed(0)}%`;

    const elementoEstado = document.getElementById("estado-salud");

    // Uso de Condicionales
    if (promedio >= 8) {
        elementoEstado.innerText = `Excelente: ${especie.nombre} está en un hábitat óptimo.`;
    } else if (promedio >= 5) {
        elementoEstado.innerText = `Alerta: ${especie.nombre} requiere seguimiento.`;
    } else {
        elementoEstado.innerText = `Crítico: Peligro para ${especie.nombre}.`;
    }
}

function renderizarHistorial(datos) {
    const tabla = document.getElementById("lista-historial");
    if (!tabla) return; // Seguridad
    
    tabla.innerHTML = "";

    datos.forEach(item => {
        const promedio = calcularPromedioFinal(item.suelo, item.brotes, item.diversidad);
        let badgeColor = "";

        // Uso de Switch
        switch (true) {
            case (promedio >= 8): badgeColor = "badge-success"; break;
            case (promedio >= 5): badgeColor = "badge-warning"; break;
            default: badgeColor = "badge-danger"; break;
        }

        tabla.innerHTML += `
        <tr>
            <td>${item.fecha}</td>
            <td><strong>${item.nombre}</strong></td>
            <td>${promedio.toFixed(1)}</td>
            <td><span class="badge ${badgeColor}">Puntaje: ${promedio.toFixed(1)}</span></td>
        </tr>
        `;
    });
}
// filtro y ciclos (while)
function filtrarEspeciesSaludables() {
    const saludables = historialObservaciones.filter(esp =>  {
        return calcularPromedioFinal(esp.suelo, esp.brotes, esp.diversidad) >=7;
        });
        console.log("---resultados del filtro---");

        //ciclo While
        let i = 0;
        while (i<saludables.length) {
            console.log("especie saludables: " +saludables[i].nombre);
            i++;
        }

        renderizarHistorial(saludables);
        alert("se necontraron " + saludables.length + "especies con salud alta.");
}
// mostras todos los registros
function mostrarTodo()  {
    console.log("Ver Todos. Cargando historial completo...");
    renderizarHistorial(historialObservaciones);
}

function limpiarFormulario(...inputs) {
    inputs.forEach(input => input.value = "");
    if(inputs[0]) inputs[0].focus();
}