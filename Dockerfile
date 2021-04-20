# Establece la imagen base
FROM node:latest


# Instalación de Nodemon en forma Global
# Al realizarse cambios reiniciar el servidor
RUN npm install nodemon -g --quiet
RUN npm install request -g --quiet

# Create app directory
RUN mkdir /app
WORKDIR /app

ADD . /app

# Instala los paquetes existentes en el package.json
COPY ./server .
COPY package*.json ./
RUN npm install 


# Inicia la aplicación al iniciar al contenedor
ENTRYPOINT ./entrypoint.sh