# Proyecto Grupal 6 - Despliegue de Servicios con Docker

## Integrantes
* ALEXANDER WILFRIDO CARRION CAÑAR 
* FELIX ESTEBAN NARVAEZ CRIOLLO
* LUIS ROLANDO SANGUCHO TENORIO
* KATHERINE GABRIELA VARGAS CHIRAU

## Descripción
Este sistema despliega una arquitectura de microservicios contenerizada con un Reverse Proxy (Nginx) que centraliza el acceso al backend y al frontend.

## Requisitos
* Docker y Docker Compose instalados.
* Git instalado.

## Instrucciones de Ejecución
Para levantar el proyecto, ejecute los siguientes comandos en la terminal:

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/proyecto-grupal-docker.git](https://github.com/tu-usuario/proyecto-grupal-docker.git)
   cd proyecto-grupal-docker
   ```

2. Construir y levantar los contenedores:
   ```bash
   docker compose up --build
   ```

3. Verificar funcionamiento (solo se expone el gateway):
   * API Backend vía Gateway: http://localhost:8080/api/health
   * API Backend vía Gateway: http://localhost:8080/api/data
   * Frontend vía Gateway: http://localhost:8080/
