# Historias de Usuario

Formato: *Como [rol], quiero [acción], para [beneficio]*, con criterios de aceptación por historia. Cada historia referencia el endpoint del backend que la implementa.

---

### HU-01 · Registro de cliente
**Como** visitante, **quiero** crear una cuenta con mi correo, contraseña y teléfono, **para** poder comprar vehículos y guardar mi información.

- Dado un correo no registrado previamente, cuando envío el formulario de registro, entonces recibo un token de sesión y quedo autenticado.
- Dado un correo ya registrado, cuando intento registrarme de nuevo, entonces el sistema rechaza la solicitud con un error claro.
- *Endpoint:* `POST /customer/signup`

### HU-02 · Inicio de sesión
**Como** cliente registrado, **quiero** iniciar sesión con mi correo y contraseña, **para** acceder a mi perfil, carrito y wishlist.

- Dadas credenciales correctas, cuando inicio sesión, entonces recibo un token de sesión válido.
- Dadas credenciales incorrectas, cuando intento iniciar sesión, entonces el sistema responde con "credenciales inválidas" sin indicar cuál campo falló.
- *Endpoint:* `POST /customer/login`

### HU-03 · Explorar catálogo de vehículos
**Como** visitante o cliente, **quiero** ver el catálogo completo de vehículos agrupado por categoría, **para** decidir cuál me interesa.

- Cuando consulto el catálogo, entonces recibo la lista de vehículos disponibles junto con las categorías existentes (sedán, SUV, pickup, hatchback, deportivo).
- *Endpoint:* `GET /`

### HU-04 · Ver detalle de un vehículo
**Como** visitante o cliente, **quiero** ver el detalle de un vehículo específico (precio, descripción, imagen), **para** decidir si lo compro.

- Dado un identificador de vehículo válido, cuando consulto su detalle, entonces recibo toda su información.
- Dado un identificador inexistente, cuando consulto su detalle, entonces el sistema responde que no fue encontrado.
- *Endpoint:* `GET /:id`

### HU-05 · Gestionar lista de deseos (wishlist)
**Como** cliente autenticado, **quiero** agregar o quitar vehículos de mi wishlist, **para** guardar los que me interesan sin comprarlos todavía.

- Dado un vehículo que no está en mi wishlist, cuando lo agrego, entonces aparece en mi lista de deseos.
- Dado un vehículo ya en mi wishlist, cuando lo quito, entonces desaparece de mi lista.
- Dada una solicitud sin token de sesión, entonces el sistema la rechaza (401).
- *Endpoints:* `PUT /wishlist`, `DELETE /wishlist/:id`

### HU-06 · Gestionar carrito de compras
**Como** cliente autenticado, **quiero** agregar vehículos a mi carrito, ajustar la cantidad o quitarlos, **para** preparar mi compra.

- Dado un vehículo, cuando lo agrego con una cantidad, entonces aparece en mi carrito con esa cantidad.
- Dado un vehículo ya en mi carrito, cuando actualizo la cantidad, entonces se refleja el nuevo valor.
- Dado un vehículo en mi carrito, cuando lo quito, entonces desaparece del carrito.
- *Endpoints:* `PUT /cart`, `DELETE /cart/:id`

### HU-07 · Registrar dirección de entrega
**Como** cliente autenticado, **quiero** registrar una dirección de entrega, **para** que mi pedido pueda despacharse.

- Dados calle, ciudad y país (campos obligatorios), cuando registro la dirección, entonces queda asociada a mi perfil.
- Dado que falta un campo obligatorio (ciudad o país), cuando intento registrar la dirección, entonces el sistema rechaza la solicitud indicando el campo faltante.
- *Endpoint:* `POST /customer/address`

### HU-08 · Consultar mi perfil
**Como** cliente autenticado, **quiero** ver mi perfil completo (dirección, carrito, wishlist, pedidos), **para** tener una vista consolidada de mi cuenta.

- Cuando consulto mi perfil, entonces recibo mis direcciones, carrito, wishlist y pedidos actuales.
- *Endpoint:* `GET /customer/profile`

### HU-09 · Realizar pedido
**Como** cliente autenticado con vehículos en mi carrito, **quiero** confirmar mi pedido, **para** formalizar la compra.

- Dado un carrito con al menos un vehículo, cuando confirmo el pedido, entonces se genera una orden con el monto total calculado y mi carrito queda vacío.
- Dado un carrito vacío, cuando intento confirmar el pedido, entonces el sistema rechaza la solicitud indicando que el carrito está vacío.
- *Endpoint:* `POST /shopping/order`
