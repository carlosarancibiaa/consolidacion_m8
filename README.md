# API Cursos Bootcamp

Servicio para la gestión del registro y creación de cursos Bootcamp y sus respectivos usuarios. Es posible hacer CRUD de las entidades 'user' y 'bootcamp' las cuales tienen una relacion muchos a muchos por lo que se ha creado una tabla pivote. Se adjunta archivo con la colección de las solicitudes HTTP requeridas para utilizar el programa.

## Metodos soportados:

<b>GET</b>: Obtener información de un usuario o todos los usuarios/Bootcamp

<b>POST</b>: Crear un nuevo Usuario/Bootcamp

<b>POST</b>: Vincular un Usuario a un Bootcamp deseado

<b>PUT</b>: Actualizar la información de un Usuario

<b>DELETE</b>: Eliminar un Usuario


## Instrucciones

Para ejecutar el servidor de ejemplo:

Verificar que el puerto 3000 no esté en uso

Ejecutar <b>npm run dev</b>  desde la terminal

El servidor estará disponible en http://localhost:3000


## Ejemplos de requests para Bootcamp


<b>Obtener información de todos los Bootcamps:</b>

GET http://localhost:3000/bootcamps


<b>Obtener información de todos los Bootcamps:</b>

GET http://localhost:3000/bootcamps/
entregar id 'n' del bootcamp solicitado, por el body en formato json:
{
    "id": n 
}

<b>Crear Bootcamp:</b>

POST http://localhost:3000/bootcamps/

Por body -> raw -> JSON se entregan los siguientes datos: { title, cue, description}


<b>Vincular User a Bootcamp:</b>

POST http://localhost:3000/bootcamps/vinculate/

Por body -> raw -> JSON se entregan los siguientes datos: { idBootcamp, idUser }


## Ejemplos de requests para User


<b>Obtener información de todos los usuarios:</b>

GET http://localhost:3000/users


<b>Obtener información de un usuario en particular (ID)</b>

GET http://localhost:3000/users

Por body se entrega en formato json el id requerido


<b>Crear User:</b>

POST http://localhost:3000/users

Por body -> raw -> JSON se entregan los siguientes datos: { firstName, lastName, email }


<b>Modificar User seleccionando por ID:</b>

PUT http://localhost:3000/users

Por body -> raw -> JSON se entregan los siguientes datos: { id, firstName, lastName, email }


<b>Se elimina User seleccionando por su ID:</b>

DELETE http://localhost:3000/users

Por body se entrega el ID: { id }

