# Servicio 5 - Reverse Proxy / Gateway (Nginx)

## Introduccion del proyecto
El proyecto despliega varios servicios contenerizados usando Docker y docker-compose. El objetivo es que el docente pueda levantar todo con un solo comando y validar el funcionamiento desde la terminal o el navegador.

## Objetivo del servicio
- Centralizar el acceso a los servicios con un unico punto de entrada.
- Redirigir el trafico del backend por la ruta /api/.
- Preparar el acceso al frontend desde la raiz (/).

## Archivos clave
- gateway/Dockerfile
- gateway/nginx.conf
- docker-compose.yml (servicio gateway y puerto 8080 expuesto)

## Comandos empleados
- docker compose up --build
- docker compose ps
- docker compose logs gateway
- curl http://localhost:8080/api/health
- curl http://localhost:8080/api/data

## Capturas de funcionamiento (sugerencias)
1. Terminal con docker compose up --build.
2. Navegador o terminal con http://localhost:8080/api/health mostrando JSON.
3. Navegador o terminal con http://localhost:8080/api/data mostrando JSON.
4. (Opcional) Navegador con http://localhost:8080/ para el frontend.

## Conclusion del servicio
El reverse proxy con Nginx centraliza el acceso al sistema y permite enrutar el backend por /api/ y el frontend por /. Esto simplifica el despliegue al exponer un solo puerto y facilita las pruebas desde el navegador.

## Conclusiones generales (borrador)
- La arquitectura por servicios independientes facilita el mantenimiento y el despliegue.
- Docker y docker-compose permiten reproducibilidad y ejecucion consistente.
- El gateway reduce la complejidad al exponer un unico punto de entrada.