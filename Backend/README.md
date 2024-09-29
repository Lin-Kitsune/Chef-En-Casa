# Chef En Casa - Backend

Este es el backend de la aplicación **Chef En Casa**, diseñada para simplificar la vida en la cocina al proporcionar recetas basadas en los ingredientes disponibles en casa. Este backend está construido con **Node.js**, **Express** y **MongoDB**, y se integra con la API de **Spoonacular** para obtener recetas.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework minimalista para Node.js.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Spoonacular API**: API de terceros para búsqueda de recetas.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

1. **Node.js**: Puedes descargarlo e instalarlo desde [aquí](https://nodejs.org/).
2. **MongoDB Atlas**: Necesitarás crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y obtener una **URI de conexión**.
3. **Spoonacular API Key**: Regístrate en [Spoonacular](https://spoonacular.com/food-api) y obtén una clave API.

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/Lin-Kitsune/Chef-En-Casa.git


2. Accede al directorio del backend:cd Chef-En-Casa/Backend
3. Instala las dependencias necesarias: npm install


Configuración:
1. Crea un archivo .env en el directorio del backend con el siguiente contenido, reemplazando los valores según corresponda:
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chefencasa?retryWrites=true&w=majority
JWT_SECRET=tuClaveSuperSecreta
SPOONACULAR_API_KEY=tuApiKeyDeSpoonacular
PORT=4000

2.MONGO_URI: Es la cadena de conexión a tu base de datos MongoDB.

3. JWT_SECRET: Una clave secreta para generar tokens JWT.

4. SPOONACULAR_API_KEY: La clave API de Spoonacular.

5. PORT: El puerto donde se ejecutará el servidor. El valor por defecto es 4000.

Ejecución
1. Para iniciar el servidor en modo desarrollo: npm run dev
2. El servidor debería estar corriendo en http://localhost:4000.

Endpoints
* Registro de usuario
* Ruta: /register
* Método: POST
* Descripción: Permite registrar un nuevo usuario.
* Cuerpo de la solicitud (JSON):
	{
  	"nombre": "John Doe",
  	"email": "john@example.com",
  	"password": "123456"
	}

Login de usuario
* Ruta: /login
* Método: POST
* Descripción: Permite iniciar sesión con un usuario registrado.

* Cuerpo de la solicitud (JSON):
	{
  	"email": "john@example.com",
  	"password": "123456"
	}
Respuesta: Devuelve un token JWT para autenticación.
	{
  	"message": "Login exitoso",
  	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
	}

Perfil (Ruta protegida)
* Ruta: /perfil
* Método: GET
* Descripción: Devuelve los detalles del perfil del usuario autenticado.
* Autenticación: Requiere token JWT en el encabezado Authorization:
Authorization: Bearer <tu-token-jwt>

Búsqueda de Recetas
* Ruta: /api/recetas
* Método: GET
* Descripción: Permite buscar recetas utilizando la API de Spoonacular.
* Parámetros:
	q: Término de búsqueda (opcional, por defecto "pasta").
Ejemplo de solicitud:
http://localhost:4000/api/recetas?q=pizza

Notas
* Para instalar las dependencias automaticamente, ejecuta:
npm install
* node_modules no se incluye en el repositorio. Se generará automáticamente cuando instales las dependencias con npm install.

Dependencias:
express: ^4.21.0
bcryptjs: ^2.4.3
jsonwebtoken: ^9.0.0
mongodb: ^6.9.0
dotenv: ^16.0.3
axios: ^1.4.0
nodemon: ^3.1.7 (para desarrollo)


Este archivo README incluye todos los detalles sobre el proyecto, las dependencias y el paso a paso para ejecutarlo. Si necesitas hacer modificaciones o agregar información adicional, simplemente edítalo antes de hacer el commit.
