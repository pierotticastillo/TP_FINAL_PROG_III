# Trabajo Final Integrador - Programación III

![Express.js Logo](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png)

## Facultad de Ciencias de la Administración - UNER

### Profesores
- 🧑‍🏫 **Novello Pelayo, Ignacio Luis**
- 🧑‍🏫 **Faure, Cristian Dario**

### Integrantes del Grupo
- 👤 **Dagatti, Marianela**
- 👤 **Olivera, Liria Marlene**
- 👤 **Pierotti Castillo, Enrique Alejandro**
- 👤 **Rosas, Alejo Leonardo**
- 👤 **Zuluaga Pelaez, Mónica**

---

## 📌 Descripción
Este es el repositorio del trabajo final integrador de la materia **Programación III**.
El proyecto es una API desarrollada en **Express.js**, conectada a una base de datos MySQL, con autenticación mediante JWT.

---

## 🚀 Tecnologías Utilizadas

- [Express.js](https://expressjs.com/) - Framework para Node.js
- [MySQL](https://www.mysql.com/) - Base de datos relacional
- [JWT](https://jwt.io/) - Autenticación segura
- [Swagger](https://swagger.io/) - Documentación de la API
- [Passport.js](http://www.passportjs.org/) - Middleware de autenticación
- Otras dependencias detalladas en `package.json`

---

## 🔧 Variables de Entorno

Asegúrate de configurar las siguientes variables en un archivo `.env` para el correcto funcionamiento del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=concesionaria
DB_PASSWORD=conceder
DB_DATABASE=concesionaria
JWT_SECRET=849f19bd341dbed0f1400dbc5273d03b3af770ccb41c6cb98951fae468257402
USER_CORREO=ponersucorreo@correo.com
PASS_CORREO=ponersucontraseñadeaplicaciones
```

---

## 📜 Instalación y Ejecución

### 1️⃣ Clonar el Repositorio
```sh
git clone https://github.com/pierotticastillo/TP_FINAL_PROG_III.git
```

### 2️⃣ Instalar Dependencias
```sh
cd TP_FINAL_PROG_III
npm install
```

### 3️⃣ Configurar Variables de Entorno
Renombrar `.env.example` a `.env` y completar los datos.

### 4️⃣ Ejecutar el Servidor
#### Modo Desarrollo
```sh
npm run dev
```
#### Modo Producción
```sh
npm start
```

---

## 📄 Documentación de la API

El proyecto utiliza **Swagger** para documentar los endpoints. Para acceder a la documentación, ejecutar el servidor y abrir en el navegador:

```
http://localhost:3000/api-docs
```

---

## 🛠 Dependencias Principales

```json
"dependencies": {
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "express-validator": "^7.2.0",
  "handlebars": "^4.7.8",
  "json2csv": "^6.0.0-alpha.2",
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0",
  "mysql2": "^3.11.3",
  "nodemailer": "^6.9.15",
  "nodemon": "^3.1.7",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "pdfkit": "^0.15.0",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
}
```

---
