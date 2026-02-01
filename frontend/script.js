// URL de API del Backend (Servicio 1)
const API_URL = 'http://localhost:5000/data';

async function fetchBackendData() {
    const mensajeDiv = document.getElementById('mensaje');

    try {
        // Intentamos obtener la respuesta
        const response = await fetch(API_URL);
        
        // Verificamos si la respuesta es correcta (status 200)
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        
        // Mostramos el mensaje y aplicamos estilo de éxito (verde)
        mensajeDiv.innerText = data.message;
        mensajeDiv.className = 'success';

    } catch (error) {
        // controlamos el error y aplicamos estilo de error (rojo)
        console.error('Error al conectar:', error);
        mensajeDiv.innerText = "Error: No se pudo conectar con el Backend (Servicio 1)";
        mensajeDiv.className = 'error';
    }
}
// Ejecutamos la función automáticamente cuando se abra la página
window.onload = fetchBackendData;
