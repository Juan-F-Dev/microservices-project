# Casos de Uso

**Actores:**
- **Visitante**: cualquier consumidor de la API sin sesión iniciada.
- **Cliente**: visitante que se autenticó y posee un token de sesión (JWT) válido.

---

### CU-01 · Registrarse
- **Actor:** Visitante
- **Precondición:** el correo indicado no está registrado.
- **Flujo principal:**
  1. El visitante envía correo, contraseña y teléfono.
  2. El sistema genera una sal y cifra la contraseña.
  3. El sistema crea el cliente y emite un token de sesión.
- **Flujo alterno:** si el correo ya existe, el sistema rechaza la solicitud con "Email already registered".
- **Postcondición:** el cliente queda registrado y autenticado.
- **Endpoint:** `POST /customer/signup`

### CU-02 · Iniciar sesión
- **Actor:** Cliente
- **Precondición:** el cliente ya está registrado.
- **Flujo principal:**
  1. El cliente envía correo y contraseña.
  2. El sistema busca el cliente por correo y valida la contraseña contra el hash almacenado.
  3. El sistema emite un token de sesión.
- **Flujo alterno:** si el correo no existe o la contraseña no coincide, el sistema responde "Invalid credentials".
- **Postcondición:** el cliente queda autenticado.
- **Endpoint:** `POST /customer/login`

### CU-03 · Consultar catálogo de vehículos
- **Actor:** Visitante o Cliente
- **Precondición:** ninguna.
- **Flujo principal:**
  1. El actor solicita el listado de vehículos.
  2. El sistema retorna todos los vehículos junto con el conjunto de categorías presentes.
- **Postcondición:** el actor conoce los vehículos disponibles.
- **Endpoint:** `GET /`

### CU-04 · Consultar detalle de vehículo
- **Actor:** Visitante o Cliente
- **Precondición:** el identificador del vehículo existe.
- **Flujo principal:**
  1. El actor solicita el detalle de un vehículo por su id.
  2. El sistema retorna nombre, descripción, tipo, precio, imagen y disponibilidad.
- **Flujo alterno:** si el id no corresponde a ningún vehículo, el sistema responde "Product not found".
- **Endpoint:** `GET /:id`

### CU-05 · Agregar/quitar vehículo de la wishlist
- **Actor:** Cliente
- **Precondición:** el cliente tiene un token de sesión válido.
- **Flujo principal (agregar):**
  1. El cliente indica el id del vehículo.
  2. El sistema busca el vehículo en el catálogo (dominio Products).
  3. El sistema delega en el dominio Customer la inserción del vehículo en la wishlist del cliente, si no está ya presente.
- **Flujo principal (quitar):**
  1. El cliente indica el id del vehículo a remover.
  2. El sistema quita el vehículo de la wishlist del cliente.
- **Flujo alterno:** sin token válido, el sistema rechaza con 401 antes de ejecutar cualquier paso.
- **Postcondición:** la wishlist del cliente queda actualizada.
- **Endpoints:** `PUT /wishlist`, `DELETE /wishlist/:id`

### CU-06 · Agregar/actualizar/quitar vehículo del carrito
- **Actor:** Cliente
- **Precondición:** el cliente tiene un token de sesión válido.
- **Flujo principal (agregar o actualizar cantidad):**
  1. El cliente indica el id del vehículo y la cantidad deseada.
  2. El sistema busca el vehículo en el catálogo.
  3. Si el vehículo ya está en el carrito, actualiza la cantidad; si no, lo agrega.
- **Flujo principal (quitar):**
  1. El cliente indica el id del vehículo a remover del carrito.
  2. El sistema lo elimina del carrito.
- **Postcondición:** el carrito del cliente queda actualizado.
- **Endpoints:** `PUT /cart`, `DELETE /cart/:id`

### CU-07 · Registrar dirección de entrega
- **Actor:** Cliente
- **Precondición:** el cliente tiene un token de sesión válido.
- **Flujo principal:**
  1. El cliente envía calle, ciudad, país y (opcionalmente) código postal.
  2. El sistema crea la dirección y la asocia al perfil del cliente.
- **Flujo alterno:** si falta calle, ciudad o país (obligatorios), el sistema rechaza la solicitud indicando el campo faltante mediante un error de validación.
- **Postcondición:** la dirección queda asociada al cliente.
- **Endpoint:** `POST /customer/address`

### CU-08 · Consultar perfil del cliente
- **Actor:** Cliente
- **Precondición:** el cliente tiene un token de sesión válido.
- **Flujo principal:**
  1. El cliente solicita su perfil.
  2. El sistema retorna sus direcciones (con datos completos), carrito, wishlist y pedidos.
- **Endpoint:** `GET /customer/profile`

### CU-09 · Realizar pedido
- **Actor:** Cliente
- **Precondición:** el cliente tiene un token de sesión válido y su carrito no está vacío.
- **Flujo principal:**
  1. El cliente confirma el pedido enviando un identificador de transacción (`txnId`).
  2. El sistema obtiene el carrito actual del cliente (dominio Customer).
  3. El sistema calcula el monto total sumando precio × cantidad de cada ítem.
  4. El sistema crea la orden con estado `received` y la agrega al historial de pedidos del cliente.
  5. El sistema vacía el carrito del cliente.
- **Flujo alterno:** si el carrito está vacío, el sistema rechaza la solicitud con "Cart is empty".
- **Postcondición:** el pedido queda registrado y el carrito vacío.
- **Endpoint:** `POST /shopping/order`
