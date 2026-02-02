# Usamos imagen ligera de Nginx
FROM nginx:alpine

# Copiamos los archivos del frontend al directorio que Nginx usa para servir contenido
COPY . /usr/share/nginx/html

# Exponemos el puerto 80, (estándar de Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
