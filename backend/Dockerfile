# Usar imagen base ligera de Python
FROM python:3.9-slim

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias e instalarlas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente
COPY . .

# Exponer el puerto (interno del contenedor)
EXPOSE 5000

# Comando para ejecutar la app
CMD ["python", "app.py"]