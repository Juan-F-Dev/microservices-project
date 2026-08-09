# Product Backlog

Resumen priorizado de las historias de usuario descritas en `02-user-history.md`, agrupadas por el dominio (servicio) del backend que las implementa.

| ID    | Historia                              | Dominio (servicio) | Prioridad | Puntos | Endpoint(s)                          |
|-------|----------------------------------------|---------------------|-----------|--------|----------------------------------------|
| HU-01 | Registro de cliente                    | Customer            | Alta      | 3      | `POST /customer/signup`                |
| HU-02 | Inicio de sesión                       | Customer            | Alta      | 2      | `POST /customer/login`                 |
| HU-03 | Explorar catálogo de vehículos          | Products            | Alta      | 2      | `GET /`                                 |
| HU-04 | Ver detalle de un vehículo              | Products            | Alta      | 1      | `GET /:id`                              |
| HU-05 | Gestionar lista de deseos (wishlist)    | Products → Customer | Media     | 3      | `PUT /wishlist`, `DELETE /wishlist/:id` |
| HU-06 | Gestionar carrito de compras            | Products → Customer | Alta      | 3      | `PUT /cart`, `DELETE /cart/:id`         |
| HU-07 | Registrar dirección de entrega          | Customer            | Media     | 2      | `POST /customer/address`               |
| HU-08 | Consultar mi perfil                     | Customer            | Media     | 2      | `GET /customer/profile`                |
| HU-09 | Realizar pedido                         | Shopping → Customer  | Alta      | 5      | `POST /shopping/order`                 |

## Nota sobre los dominios

El backend está organizado en **tres servicios de dominio**, cada uno con su propia capa de API → Servicio → Repositorio → Modelo:

- **Customer** (`src/api/customer.js`, `customer-service.js`, `customer-repository.js`, modelos `Customer` y `Address`): registro, login, perfil, direcciones, y es también el **dueño de los datos** de wishlist, carrito y pedidos (viven embebidos en el documento del cliente).
- **Products** (`src/api/products.js`, `products-service.js`, `product-repository.js`, modelo `Product`): catálogo de vehículos; expone también las rutas de wishlist/carrito, pero delega la escritura de esos datos en `CustomerService` — nunca accede al repositorio de Customer directamente.
- **Shopping** (`src/api/shopping.js`, `shopping-service.js`): confirmación de pedidos; obtiene el carrito y registra la orden llamando también a `CustomerService`, respetando el mismo límite de dominio.

Esta regla de frontera (un dominio solo entra a otro por su servicio público) es intencional: prepara el código para una futura división en microservicios sin necesidad de reescribir la lógica de negocio.
