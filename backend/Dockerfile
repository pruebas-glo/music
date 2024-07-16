# Usa la imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el paquete de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Copia el archivo de variables de entorno
COPY .env .env

# Expone el puerto usado por la aplicación
EXPOSE 8080

# Comando para correr la aplicación
CMD ["node", "server.js"]
