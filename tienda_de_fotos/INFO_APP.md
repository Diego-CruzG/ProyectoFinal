# INFO APP

1. La aplicacion se trabajo con una base de datos hecha en MYSQL se anexan los archivos
  **fotos_para_ti_dump.sql** con los script de la base de datos y
  **fotos_para_ti_model.mwb** que contiene el modelo de la base de datos

2. Dentro del script de la base de datos se encuentran las sentencias para agregar
   tres administradores, tres clientes y seis fotos para trabajar con la aplicacion

3. Para visualizar las ordenes de compra y los detalles de las ordenes que se solicitan en 
el **punto 1**, se debe ingresar con algun cliente 1 o 3 de la base de datos y realizar una compra

4. Se creo un administrador **Master** (privilegio 1 en la tabla admin) y dos **User** (privilegio 0). 
   cuando se ingresa con el administrador master se tienen todos los privilegios para desactivar 
   y activar otros administradores y tambien visualizar las contraseñas de cada uno y tambien de los clientes.
   Cuando se ingresa con los administradores user, estos no tienen derechos para activas o desactivar otros
   administradores o a si mismos, ademas no pueden visualizar las contraseñas.