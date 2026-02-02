# Proyecto Grupal 6 - Despliegue de Servicios con Docker

## Integrantes
* ALEXANDER WILFRIDO CARRION CAÑAR 
* FELIX ESTEBAN NARVAEZ CRIOLLO
* LUIS ROLANDO SANGUCHO TENORIO
* KATHERINE GABRIELA VARGAS CHIRAU

## Descripción General
Este proyecto implementa una **arquitectura de microservicios contenerizada** utilizando Docker y Docker Compose. El sistema despliega múltiples servicios independientes que trabajan en conjunto a través de una red interna, con un punto de entrada único (Gateway/Reverse Proxy).

### Objetivos del Proyecto
- Comprender y aplicar conceptos de containerización con Docker
- Implementar una arquitectura de microservicios escalable
- Utilizar Docker Compose para orquestar múltiples servicios
- Configurar un reverse proxy (Nginx) como punto de entrada único
- Implementar comunicación interna entre servicios

---

## Estructura del Proyecto

```
proyecto-grupal-docker/
├── backend/                 # Servicio 1 - API REST (Flask)
│   ├── app.py              # Aplicación principal
│   ├── Dockerfile          # Definición del contenedor
│   └── requirements.txt     # Dependencias Python
│
├── frontend/               # Servicio 3 - Interfaz Web (Nginx)
│   ├── index.html          # Página principal
│   ├── script.js           # Lógica del cliente
│   ├── style.css           # Estilos CSS
│   ├── Dockerfile          # Definición del contenedor
│   └── images/             # Imágenes estáticas
│
├── gateway/                # Servicio 4 - Reverse Proxy (Nginx)
│   ├── Dockerfile          # Definición del contenedor
│   └── nginx.conf          # Configuración de enrutamiento
│
├── database/               # Servicio 2 - Base de Datos (PostgreSQL)
│   └── .env                # Variables de entorno
│
├── docs/                   # Documentación adicional
│   └── servicio-5-reverse-proxy.md
│
├── docker-compose.yml      # Orquestación de servicios
└── README.md               # Este archivo
```

---

## Servicios Implementados

### 🔵 Servicio 1 - API REST (Backend)
**Tecnología:** Python + Flask  
**Puerto (interno):** 5000  
**Ubicación:** `/backend`

**Características:**
- Expone endpoints REST (`/health`, `/data`)
- Procesa lógica del sistema
- Gestiona comunicación con la base de datos
- Implementa CORS para permitir acceso desde frontend
- Se conecta a PostgreSQL mediante variables de entorno

**Endpoints disponibles:**
```
GET http://localhost:8080/api/health     → Verifica estado del servicio
GET http://localhost:8080/api/data       → Obtiene datos de ejemplo
```

**Dependencias:**
- Flask 3.0.0 - Framework web
- flask-cors 4.0.0 - Permitir CORS desde frontend

---

### 🟢 Servicio 2 - Base de Datos
**Tecnología:** PostgreSQL 15  
**Nombre del contenedor:** `db_proyecto`  
**Puerto (interno):** 5432  
**Ubicación:** `/database`

**Configuración:**
- Usuario: `admin`
- Contraseña: `1234`
- Base de datos: `proyecto_db`
- Volumen persistente: `db_data`

**Nota:** No expone puerto hacia el exterior, solo comunicación interna dentro de la red `app-network`.

---

### 🟡 Servicio 3 - Frontend Web
**Tecnología:** HTML + CSS + JavaScript + Nginx  
**Puerto (interno):** 80  
**Ubicación:** `/frontend`

**Características:**
- Interfaz web estática servida por Nginx
- Consume API backend mediante JavaScript
- Página de inicio con información de la ESPE
- Estilos profesionales con CSS

---

### 🔴 Servicio 4 - Gateway / Reverse Proxy
**Tecnología:** Nginx  
**Puerto (externo):** 8080  
**Ubicación:** `/gateway`

**Funcionalidad:**
- **Punto de entrada único** para toda la aplicación
- Redirige peticiones `/api/*` al backend
- Redirige peticiones `/` al frontend
- Maneja headers HTTP adecuadamente
- Balanceo de carga entre servicios

**Rutas disponibles:**
```
http://localhost:8080/api/...    → Redirecciona a backend:5000/...
http://localhost:8080/           → Redirecciona a frontend:80/
```

---

## Requisitos Previos

### Obligatorios
- **Docker Desktop** (versión 20.10+) - [Descargar aquí](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (generalmente incluido con Docker Desktop)
- **Git** (opcional, para clonar el repositorio)

### Verificar instalación
```powershell
# Verificar Docker
docker --version

# Verificar Docker Compose
docker compose version
```

---

## Instrucciones de Instalación y Ejecución

### 1️⃣ Clonar o descargar el repositorio
```powershell
# Opción A: Clonar con Git
git clone https://github.com/tu-usuario/proyecto-grupal-docker.git
cd proyecto-grupal-docker

# Opción B: Descargar ZIP y extraer
# Luego navegar a la carpeta extraída
```

### 2️⃣ Navegar al directorio del proyecto
```powershell
cd "D:\INGENIERIA EN TICS\5TO CICLO\APLICACIÓN SISTEMAS OPERATIVOS\proyecto-grupal-docker"
```

### 3️⃣ Construir y levantar los servicios
```powershell
# Construir imágenes y levantar contenedores
docker compose up --build

# Alternativa: ejecutar en segundo plano
docker compose up --build -d
```

**Tiempo de construcción esperado:** 2-3 minutos (primera vez)

### 4️⃣ Verificar que todo está funcionando
```powershell
# Ver estado de los contenedores
docker compose ps
```

**Salida esperada:**
```
CONTAINER ID   IMAGE             STATUS              PORTS
xxxxx         proyecto-backend   Up 2 minutes        
xxxxx         db_proyecto        Up 2 minutes        
xxxxx         proyecto-frontend  Up 2 minutes        
xxxxx         reverse-proxy      Up 2 minutes        0.0.0.0:8080->80/tcp
```

---

## Pruebas de Funcionamiento

### Opción 1: Navegador Web
1. Abre tu navegador
2. Navega a: **http://localhost:8080**
3. Deberías ver la página principal del frontend

### Opción 2: Probar APIs con curl (PowerShell)
```powershell
# Verificar estado del backend
curl http://localhost:8080/api/health

# Obtener datos de ejemplo
curl http://localhost:8080/api/data

# Ver logs del gateway (verificar enrutamiento)
docker compose logs gateway

# Ver logs del backend
docker compose logs backend
```

### Opción 3: Usar Postman o Insomnia
1. Crear una nueva petición GET
2. URL: `http://localhost:8080/api/health`
3. Enviar petición

---

## Comandos Útiles

### Gestión de Contenedores
```powershell
# Levantar servicios
docker compose up

# Levantar en segundo plano (-d)
docker compose up -d

# Detener servicios
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Ver estado
docker compose ps

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend
docker compose logs -f gateway
docker compose logs -f database
docker compose logs -f frontend
```

### Depuración
```powershell
# Ejecutar comando dentro de un contenedor
docker compose exec backend bash
docker compose exec frontend bash

# Ver estadísticas de recursos
docker stats

# Inspeccionar red
docker network inspect app-network
```

### Limpieza
```powershell
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no utilizadas
docker image prune

# Eliminar todo (contenedores, redes, volúmenes)
docker compose down -v
```

---

## Solución de Problemas

### ❌ Error: "Port 8080 is already in use"
**Solución:**
```powershell
# Encontrar qué proceso usa el puerto
netstat -ano | findstr :8080

# Cambiar puerto en docker-compose.yml
# Reemplazar: "8080:80" con "8081:80"
```

### ❌ Error: "Cannot connect to database"
**Solución:**
```powershell
# Ver logs del backend
docker compose logs backend

# Verificar que database está corriendo
docker compose ps

# Reiniciar servicios
docker compose down -v
docker compose up --build
```

### ❌ Error: "Connection refused" en frontend
**Solución:**
- Esperar 30 segundos después de ejecutar `docker compose up` (tiempo de inicialización)
- Verificar que el gateway está corriendo: `docker compose ps`
- Ver logs del gateway: `docker compose logs gateway`

### ❌ Cambios en código no se reflejan
**Solución:**
```powershell
# Reconstruir imágenes
docker compose up --build

# O reconstruir solo un servicio
docker compose up --build backend
```

---

## Arquitectura y Comunicación

### Diagrama de la Red
```
┌─────────────────────────────────────────────────────┐
│           Docker Network (app-network)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐    ┌──────────────┐              │
│  │   Frontend   │    │   Backend    │              │
│  │   (Nginx)    │    │   (Flask)    │              │
│  │   :80        │    │   :5000      │              │
│  └──────────────┘    └──────────────┘              │
│         ▲                    ▲                      │
│         └────────┬───────────┘                      │
│                  │                                 │
│            ┌──────────────┐                        │
│            │   Database   │                        │
│            │  (PostgreSQL)│                        │
│            │   :5432      │                        │
│            └──────────────┘                        │
│                                                     │
└─────────────────────────────────────────────────────┘
          │
          │ Puerto 8080
          │
    ┌─────▼──────┐
    │  Gateway   │
    │  (Nginx)   │ ← Punto de entrada único
    └────────────┘
          │
          │ http://localhost:8080
          │
      ┌───▼────┐
      │ Cliente │
      │(Browser)│
      └─────────┘
```

### Flujo de Comunicación

1. **Usuario accede a http://localhost:8080**
   - Gateway (Nginx) recibe la petición en puerto 8080
   
2. **Petición a raíz (/):**
   - Gateway → Frontend (Nginx interno)
   - Se devuelve HTML + CSS + JavaScript
   
3. **Petición a /api/:**
   - Gateway → Backend (Flask)
   - Backend procesa lógica y consulta BD
   - Se devuelve JSON

4. **Comunicación Backend-Database:**
   - Backend → PostgreSQL (red interna, sin exponer puerto)
   - Comunicación segura dentro de `app-network`

---

## Archivos de Configuración Clave

### docker-compose.yml
Define la orquestación de todos los servicios:
- **backend:** Build desde `./backend`, conectado a red `app-network`, variables de entorno para BD
- **database:** Imagen PostgreSQL:15, volumen persistente, red interna
- **frontend:** Build desde `./frontend`, conectado a red `app-network`
- **gateway:** Build desde `./gateway`, publica puerto 8080, enruta a otros servicios

### backend/requirements.txt
```
Flask==3.0.0
flask-cors==4.0.0
```

### gateway/nginx.conf
Configura reglas de enrutamiento:
- Upstream a backend:5000
- Upstream a frontend:80
- Proxy inverso en /api/ y /

### database/.env
Variables de entorno para PostgreSQL

---

## Próximas Mejoras Sugeridas

- [ ] Añadir autenticación (JWT)
- [ ] Implementar base de datos con datos reales
- [ ] Añadir servicios adicionales (cache Redis, workers celery)
- [ ] Implementar CI/CD con GitHub Actions
- [ ] Añadir logging centralizado (ELK stack)
- [ ] Monitoreo con Prometheus + Grafana
- [ ] Implementar health checks más robustos
- [ ] Documentación API con Swagger/OpenAPI

---

## Referencias y Documentación

- [Documentación Docker](https://docs.docker.com/)
- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Documento de Reverse Proxy](docs/servicio-5-reverse-proxy.md)

---

## Licencia
Proyecto educativo - Universidad de las Fuerzas Armadas ESPE

**Última actualización:** Febrero 2026