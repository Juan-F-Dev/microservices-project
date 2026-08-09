# Estructura de requerimientos del sistema

Proyecto: **Car Sales API** — API REST para la compra de vehículos (sedán, SUV, pickup, hatchback, deportivo), compuesta por tres dominios: **Customer** (clientes y autenticación), **Products** (catálogo de vehículos) y **Shopping** (carrito, wishlist y pedidos).

## 01 Requerimientos Funcionales

RF1 - El sistema debe permitir a un usuario registrarse (signup) con correo, contraseña y teléfono, devolviendo un token de sesión.
RF2 - El sistema debe permitir a un usuario registrado iniciar sesión (login) validando su correo y contraseña, devolviendo un token de sesión (JWT).
RF3 - El sistema debe permitir consultar el catálogo completo de vehículos disponibles junto con sus categorías (`GET /`).
RF4 - El sistema debe permitir consultar el detalle de un vehículo específico por su identificador (`GET /:id`).
RF5 - El sistema debe permitir a un cliente autenticado agregar y remover vehículos de su lista de deseos (wishlist).
RF6 - El sistema debe permitir a un cliente autenticado agregar, actualizar la cantidad y remover vehículos de su carrito de compras.
RF7 - El sistema debe permitir a un cliente autenticado registrar una nueva dirección de entrega asociada a su perfil.
RF8 - El sistema debe permitir a un cliente autenticado consultar su perfil completo: dirección(es), carrito, wishlist y pedidos realizados.
RF9 - El sistema debe permitir a un cliente autenticado generar un pedido a partir del contenido actual de su carrito, calculando el monto total y vaciando el carrito tras confirmarlo.
RF10 - El sistema debe rechazar el acceso a operaciones de wishlist, carrito, dirección y pedidos a cualquier solicitud que no incluya un token de sesión válido.

## 02 Requerimientos No Funcionales

NRF1 - Seguridad: las contraseñas de los clientes deben almacenarse cifradas (hash + salt), nunca en texto plano; la sesión se maneja mediante tokens JWT con expiración.
NRF2 - Arquitectura: cada dominio (Customer, Products, Shopping) debe mantener sus límites — un dominio solo accede a datos de otro a través de la capa de servicio pública de ese dominio, nunca directamente a su repositorio o modelo.
NRF3 - Interoperabilidad: la API debe exponerse en formato JSON sobre HTTP con CORS habilitado, de forma que cualquier frontend (SPA, móvil) pueda consumirla sin acoplarse a su implementación.
NRF4 - Portabilidad: el sistema (API + base de datos MongoDB) debe poder desplegarse de forma reproducible mediante contenedores Docker (`docker-compose.yml`), sin depender de instalación manual de dependencias en el host.
NRF5 - Disponibilidad de datos de prueba: el sistema debe contar con un script de siembra (`npm run seed`) que permita poblar el catálogo de vehículos de forma repetible para entornos de desarrollo y pruebas.
